import type { ContactData } from "#/shared/types/contact/contact";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
} from "bun:test";
import type { ZodType } from "zod";

type ContactHandler = (args: {
  data: ContactData;
}) => Promise<{ ok: boolean }>;

const contactData: ContactData = {
  name: "John Doe",
  email: "john@example.com",
  message: "This is a test message.",
  captchaToken: "test-captcha-token",
};

const originalFetch = globalThis.fetch;
const mockConsume = mock(async (_ip: string) => undefined);

const response = {
  captchaSuccess: true,
  resendStatus: 200,
  slackStatus: 200,
};

const mockFetch = mock(
  async (
    input: RequestInfo | URL,
    _init?: RequestInit,
  ): Promise<Response> => {
    const url = String(input);
    if (
      url ===
      "https://www.google.com/recaptcha/api/siteverify"
    ) {
      return Response.json({
        success: response.captchaSuccess,
      });
    }
    if (url === "https://api.resend.com/emails") {
      return new Response(null, {
        status: response.resendStatus,
      });
    }
    if (url === "https://hooks.slack.test/contact") {
      return new Response(null, {
        status: response.slackStatus,
      });
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  },
);

mock.module("@tanstack/react-start", () => ({
  createServerFn: () => ({
    validator: (schema: ZodType<ContactData>) => ({
      handler: (handler: ContactHandler) => {
        return async ({ data }: { data: ContactData }) =>
          handler({ data: schema.parse(data) });
      },
    }),
  }),
}));

mock.module("@tanstack/react-start/server", () => ({
  getRequest: () => ({
    headers: new Headers({
      "x-forwarded-for": "203.0.113.10",
    }),
  }),
}));

mock.module("rate-limiter-flexible", () => ({
  RateLimiterMemory: class {
    consume = mockConsume;
  },
}));

mock.module("#/env/server", () => ({
  env: {
    GOOGLE_RECAPTCHA_SECRET_KEY: "test-secret",
    RESEND_API_KEY: "test-resend-key",
    CONTACT_FROM_EMAIL: "from@example.com",
    CONTACT_TO_EMAIL: "to@example.com",
    SLACK_WEBHOOK_URL:
      "https://hooks.slack.test/contact",
  },
}));

const { sendContactMessage } = await import(
  "#/shared/lib/contact-server"
);

describe("sendContactMessage", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockConsume.mockClear();
    mockConsume.mockImplementation(
      async () => undefined,
    );
    response.captchaSuccess = true;
    response.resendStatus = 200;
    response.slackStatus = 200;
    globalThis.fetch =
      mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should submit contact form successfully", async () => {
    const result = await sendContactMessage({
      data: contactData,
    });
    expect(result).toEqual({ ok: true });
    expect(mockConsume).toHaveBeenCalledWith(
      "203.0.113.10",
    );
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://www.google.com/recaptcha/api/siteverify",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(mockFetch).toHaveBeenCalledWith(
      "https://hooks.slack.test/contact",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("should reject invalid contact data", async () => {
    await expect(
      sendContactMessage({
        data: {
          ...contactData,
          message: "short",
        },
      }),
    ).rejects.toThrow();
    expect(mockConsume).not.toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should reject invalid captcha", async () => {
    response.captchaSuccess = false;
    await expect(
      sendContactMessage({
        data: contactData,
      }),
    ).rejects.toThrow(
      "Captcha verification failed.",
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should reject requests when rate limit is exceeded", async () => {
    mockConsume.mockImplementation(async () => {
      throw new Error("Rate limit exceeded");
    });
    await expect(
      sendContactMessage({
        data: contactData,
      }),
    ).rejects.toThrow(
      "Too many attempts. Please try again shortly.",
    );
    expect(mockConsume).toHaveBeenCalledTimes(1);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should throw when Resend and Slack both fail", async () => {
    response.resendStatus = 500;
    response.slackStatus = 500;
    await expect(
      sendContactMessage({
        data: contactData,
      }),
    ).rejects.toThrow("Failed to send message");
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it("should succeed when Resend fails but Slack succeeds", async () => {
    response.resendStatus = 500;
    const result = await sendContactMessage({
      data: contactData,
    });
    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it("should succeed when Slack fails but Resend succeeds", async () => {
    response.slackStatus = 500;
    const result = await sendContactMessage({
      data: contactData,
    });
    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it("should sanitize HTML before sending messages", async () => {
    await sendContactMessage({
      data: {
        ...contactData,
        message:
          "Hello! <script>alert('xss')</script>",
      },
    });

    const resendCall = mockFetch.mock.calls.find(
      ([url]) =>
        String(url) === "https://api.resend.com/emails",
    );

    expect(resendCall).toBeDefined();

    const body = JSON.parse(
      String(resendCall?.[1]?.body),
    ) as {
      html: string;
      text: string;
    };
    expect(body.html).toContain("&lt;script&gt;");
    expect(body.html).not.toContain("<script>");
    expect(body.text).not.toContain("<script>");
  });

  it("should send the correct email payload", async () => {
    await sendContactMessage({
      data: contactData,
    });
    const resendCall = mockFetch.mock.calls.find(
      ([url]) =>
        String(url) === "https://api.resend.com/emails",
    );
    expect(resendCall).toBeDefined();
    const body = JSON.parse(
      String(resendCall?.[1]?.body),
    ) as Record<string, unknown>;
    expect(body.from).toBe("from@example.com");
    expect(body.to).toBe("to@example.com");
    expect(body.reply_to).toBe(contactData.email);
    expect(body.subject).toBe(
      `Novo contato de ${contactData.name}`,
    );
  });
});
