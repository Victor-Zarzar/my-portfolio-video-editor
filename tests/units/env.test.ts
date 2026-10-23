import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

const runtimeKeys = ["window", "document", "navigator"] as const;

const originalDescriptors = Object.fromEntries(
  runtimeKeys.map((key) => [
    key,
    Object.getOwnPropertyDescriptor(globalThis, key),
  ]),
);

function forceServerRuntime(): void {
  for (const key of runtimeKeys) {
    Reflect.deleteProperty(globalThis, key);
  }
}

function restoreRuntime(): void {
  for (const key of runtimeKeys) {
    const descriptor = originalDescriptors[key];

    if (descriptor) {
      Object.defineProperty(globalThis, key, descriptor);
    } else {
      Reflect.deleteProperty(globalThis, key);
    }
  }
}

describe("env loading .env", () => {
  beforeEach(() => {
    forceServerRuntime();
  });

  afterEach(() => {
    restoreRuntime();
  });

  test("reads server environment variables", async () => {
    const { env } = await import("#/env/server");
    const requiredKeys = [
      "RESEND_API_KEY",
      "SLACK_WEBHOOK_URL",
      "CONTACT_FROM_EMAIL",
      "CONTACT_TO_EMAIL",
      "GOOGLE_RECAPTCHA_SECRET_KEY",
    ] as const;

    for (const key of requiredKeys) {
      const value = process.env[key];
      if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
      }
      expect(env[key] === value).toBe(true);
    }
  });

  test("reads client environment variables", async () => {
    const { env } = await import("#/env/client");
    const requiredKeys = [
      "VITE_APP_URL",
      "VITE_SITE_EMAIL",
      "VITE_RECAPTCHA_SITE_KEY",
      "VITE_GA_MEASUREMENT_ID",
    ] as const;

    for (const key of requiredKeys) {
      const value = process.env[key];
      if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
      }
      expect(env[key] === value).toBe(true);
    }
  });

  test("handles optional environment variables", async () => {
    const { env: serverEnv } = await import("#/env/server");
    const { env: clientEnv } = await import("#/env/client");
    const optionalServerKeys = [
      "SENTRY_DSN",
      "SENTRY_AUTH_TOKEN",
      "SENTRY_ORG",
      "SENTRY_PROJECT",
    ] as const;

    const optionalClientKeys = [
      "VITE_SENTRY_DSN",
      "VITE_DISABLE_DEVTOOLS",
    ] as const;

    for (const key of optionalServerKeys) {
      expect(
        serverEnv[key] === (process.env[key] || undefined),
      ).toBe(true);
    }

    for (const key of optionalClientKeys) {
      expect(
        clientEnv[key] === (process.env[key] || undefined),
      ).toBe(true);
    }
  });
});
