import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "please enter your email" })
    .email({ message: "please enter a valid email" }),
  password: z.string().min(1, {
    message: "please enter your password",
  }),
});

export const RegisterCustomerSchema = z.object({
  email: z.string().email().min(1, { message: "please enter your email" }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
  name: z.string().min(1, { message: "please enter your name" }),
  contact: z.string().min(11, { message: "please enter your contact number" }),
  birthdate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  photoBytes: z.optional(z.string()),
  userServiceCare: z.optional(z.boolean()),
});

export const RegisterCaregiverSchema = z.object({
  type: z.string(),
  description: z.string(),
  offerings: z.string(),
  email: z.string().email().min(1, { message: "please enter your email" }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
  name: z.string().min(1, { message: "please enter your name" }),
  contact: z.string().min(11, { message: "please enter your contact number" }),
  birthdate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  photoBytes: z.optional(z.string()),
  userServiceCare: z.optional(z.boolean()),
});

export const RoleCaregiverSchema = z.object({
  type: z.string(),
  description: z.string(),
  offerings: z.string(),
});

export const CookiesSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const TokenSchema = z.string();
export const UserType = z.string();
export const EmailSchema = z.string();

export const sessionCookieSchema = z.object({
  value: z.object({
    name: z.string(),
    value: z.string(),
  }),
});

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  contactNo: z.string(),
  birthDate: z.string(),
  photoId: z.null().or(z.string()),
  userServiceCare: z.null().or(
    z.object({
      id: z.number(),
      description: z.string(),
      type: z.string(),
      offerings: z.array(z.string()),
    })
  ),
});

const customerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  contactNo: z.string().length(11),
  birthDate: z.string(),
  photoId: z.string().optional(),
  userServiceCare: z.any().optional(),
});

export const RequestSchema = z.object({
  requestId: z.number().int(),
  customer: customerSchema,
  requestDetails: z.string(),
  requestStatus: z.string(),
});

export const RequestsSchema = z.array(RequestSchema);

export const CustomerRequestSchema = z.object({
  requestDetails: z
    .string()
    .min(1, { message: "please enter the Description" }),
  requestTitle: z.string().min(1, { message: "please enter the Title" }),
  requestLocation: z.string().min(1, { message: "please enter the Location" }),
});
export const CustomerRequestIdSchema = z.object({
  requestId: z.number(),
});
export const ProviderOfferSchema = z.object({
  requestId: z.number(),
  offerDetails: z.string().min(1, { message: "please enter your offer" }),
});
export const ProviderOfferInputSchema = z.object({
  offerDetails: z.string().min(1, { message: "please enter your offer" }),
});

export const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export const AcceptOfferSchema = z.object({
  offerId: z.number(),
});
export const UserSettings = z.object({
  name: z.string().optional(),
  birthdate: z
    .date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
    .optional(),
  contactNo: z.string().optional(),
});
