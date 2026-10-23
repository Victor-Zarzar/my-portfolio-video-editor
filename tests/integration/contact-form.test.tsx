import {
   afterEach,
   beforeEach,
   describe,
   expect,
   it,
   mock,
 } from "bun:test"
 import {
   QueryClient,
   QueryClientProvider,
 } from "@tanstack/react-query"
 import {
   cleanup,
   fireEvent,
   render,
   screen,
   waitFor,
 } from "@testing-library/react"
 import { createContactSchema } from "#/shared/lib/contact-schema"
 import type { ContactInput } from "#/shared/lib/contact-schema"
 import type { ContactFormProps } from "#/shared/types/contact/contact"

 const sendContactMessageMock = mock(
   async (_args: { data: ContactInput }) => ({
     ok: true,
   }),
 )

 const executeRecaptchaMock = mock(
   async (_action: string) => "test-captcha-token",
 )

 const toastSuccessMock = mock(() => undefined)
 const toastErrorMock = mock(() => undefined)

 const sentryCaptureExceptionMock = mock(
   (_error: unknown) => undefined,
 )

 mock.module("#/shared/lib/contact-server", () => ({
   sendContactMessage: sendContactMessageMock,
 }))

 mock.module("react-google-recaptcha-v3", () => ({
   useGoogleReCaptcha: () => ({
     executeRecaptcha: executeRecaptchaMock,
   }),
 }))

 mock.module("sonner", () => ({
   toast: {
     success: toastSuccessMock,
     error: toastErrorMock,
   },
 }))

 mock.module("@sentry/tanstackstart-react", () => ({
   captureException: sentryCaptureExceptionMock,
 }))

 const { ContactForm } = await import(
   "#/shared/features/contact-form"
 )

 const validationMessages = {
   nameTooShort: "Name is too short",
   emailInvalid: "Invalid email address",
   messageTooShort: "Message is too short",
   captchaRequired: "Captcha is required",
 }

 const schema = createContactSchema(validationMessages)

 const labels: ContactFormProps["labels"] = {
   name: "Name",
   namePlaceholder: "Your name",
   email: "Email",
   emailPlaceholder: "Your email",
   message: "Message",
   messagePlaceholder: "Your message",
   submit: "Send message",
   sending: "Sending...",
   success: "Message sent successfully",
   error: "Failed to send message",
 }

 function renderContactForm() {
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         retry: false,
       },
       mutations: {
         retry: false,
       },
     },
   })

   return render(
     <QueryClientProvider client={queryClient}>
       <ContactForm schema={schema} labels={labels} />
     </QueryClientProvider>,
   )
 }

 function fillContactForm(
   overrides: {
     name?: string
     email?: string
     message?: string
   } = {},
 ) {
   fireEvent.change(
     screen.getByRole("textbox", { name: labels.name }),
     {
       target: { value: overrides.name ?? "Victor" },
     },
   )
   fireEvent.change(
     screen.getByRole("textbox", { name: labels.email }),
     {
       target: {
         value: overrides.email ?? "victor@example.com",
       },
     },
   )
   fireEvent.change(
     screen.getByRole("textbox", { name: labels.message }),
     {
       target: {
         value:
           overrides.message ??
           "This is a valid integration test message.",
       },
     },
   )
 }
 function submitContactForm() {
   fireEvent.click(
     screen.getByRole("button", { name: labels.submit }),
   )
 }
 describe("ContactForm integration", () => {
   beforeEach(() => {
     sendContactMessageMock.mockClear()
     executeRecaptchaMock.mockClear()
     toastSuccessMock.mockClear()
     toastErrorMock.mockClear()
     sentryCaptureExceptionMock.mockClear()
     sendContactMessageMock.mockImplementation(
       async () => ({ ok: true }),
     )
     executeRecaptchaMock.mockImplementation(
       async () => "test-captcha-token",
     )
   })
   afterEach(() => {
     cleanup()
   })
   it("should render an empty form with disabled submit button", () => {
     renderContactForm()
     const button = screen.getByRole("button", {
       name: labels.submit,
     }) as HTMLButtonElement
     expect(button.disabled).toBe(true)
     expect(sendContactMessageMock).not.toHaveBeenCalled()
   })
   it("should submit valid data successfully", async () => {
     renderContactForm()
     fillContactForm()
     submitContactForm()
     await waitFor(() => {
       expect(sendContactMessageMock).toHaveBeenCalledWith({
         data: {
           name: "Victor",
           email: "victor@example.com",
           message:
             "This is a valid integration test message.",
           website: "",
           captchaToken: "test-captcha-token",
         },
       })
     })
     expect(executeRecaptchaMock).toHaveBeenCalledWith(
       "contact_form",
     )
     await waitFor(() => {
       expect(toastSuccessMock).toHaveBeenCalledWith(
         labels.success,
       )
     })
     expect(toastErrorMock).not.toHaveBeenCalled()
     expect(sentryCaptureExceptionMock).not.toHaveBeenCalled()
   })
   it("should reset the form after successful submission", async () => {
     renderContactForm()
     fillContactForm()
     submitContactForm()
     await waitFor(() => {
       expect(toastSuccessMock).toHaveBeenCalled()
     })
     const name = screen.getByRole("textbox", {
       name: labels.name,
     }) as HTMLInputElement
     const email = screen.getByRole("textbox", {
       name: labels.email,
     }) as HTMLInputElement
     const message = screen.getByRole("textbox", {
       name: labels.message,
     }) as HTMLTextAreaElement
     expect(name.value).toBe("")
     expect(email.value).toBe("")
     expect(message.value).toBe("")
   })
   it("should reject invalid form data before calling server", async () => {
     renderContactForm()
     fillContactForm({
       email: "invalid-email",
       message: "short",
     })
     submitContactForm()
     expect(
       await screen.findByText(
         validationMessages.emailInvalid,
       ),
     ).toBeDefined()
     expect(
       screen.getByText(
         validationMessages.messageTooShort,
       ),
     ).toBeDefined()
     expect(sendContactMessageMock).not.toHaveBeenCalled()
     expect(toastSuccessMock).not.toHaveBeenCalled()
     expect(sentryCaptureExceptionMock).not.toHaveBeenCalled()
   })
   it("should reject submission without captcha token", async () => {
     executeRecaptchaMock.mockImplementation(
       async () => "",
     )
     renderContactForm()
     fillContactForm()
     submitContactForm()
     await waitFor(() => {
       expect(toastErrorMock).toHaveBeenCalledWith(
         labels.error,
       )
     })
     expect(sendContactMessageMock).not.toHaveBeenCalled()
     expect(sentryCaptureExceptionMock).not.toHaveBeenCalled()
   })
   it("should capture server errors with Sentry", async () => {
     const error = new Error("Server error")
     sendContactMessageMock.mockImplementation(
       async () => {
         throw error
       },
     )
     renderContactForm()
     fillContactForm()
     submitContactForm()
     await waitFor(() => {
       expect(sentryCaptureExceptionMock).toHaveBeenCalledWith(
         error,
       )
     })
     expect(toastErrorMock).toHaveBeenCalledWith(
       labels.error,
     )
     expect(toastSuccessMock).not.toHaveBeenCalled()
     const name = screen.getByRole("textbox", {
       name: labels.name,
     }) as HTMLInputElement
     expect(name.value).toBe("Victor")
   })
   it("should prevent submissions when honeypot is filled", async () => {
     renderContactForm()
     fillContactForm()
     const honeypot = document.querySelector(
       'input[name="website"]',
     ) as HTMLInputElement
     expect(honeypot).not.toBeNull()
     fireEvent.change(honeypot, {
       target: { value: "spam-bot.com" },
     })
     submitContactForm()
     await waitFor(() => {
       expect(executeRecaptchaMock).toHaveBeenCalledTimes(1)
     })
     expect(sendContactMessageMock).not.toHaveBeenCalled()
     expect(toastSuccessMock).not.toHaveBeenCalled()
   })
   it("should disable submit while mutation is pending", async () => {
     let resolveSend:
       | ((value: { ok: boolean }) => void)
       | undefined
     sendContactMessageMock.mockImplementation(
       () =>
         new Promise<{ ok: boolean }>((resolve) => {
           resolveSend = resolve
         }),
     )
     renderContactForm()
     fillContactForm()
     submitContactForm()
     await waitFor(() => {
       const button = screen.getByRole("button", {
         name: labels.sending,
       }) as HTMLButtonElement
       expect(button.disabled).toBe(true)
     })
     expect(sendContactMessageMock).toHaveBeenCalledTimes(1)
     resolveSend?.({ ok: true })
     await waitFor(() => {
       expect(toastSuccessMock).toHaveBeenCalledWith(
         labels.success,
       )
     })
   })
 })
