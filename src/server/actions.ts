"use server";

import {
  RegisterCustomerSchema,
  RegisterCaregiverSchema,
  LoginSchema,
  TokenSchema,
  CookiesSchema,
  ProviderOfferSchema,
  CustomerRequestSchema,
  UserType,
  AcceptOfferSchema,
  EmailSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedLogin = LoginSchema.safeParse(values);
  if (!validatedLogin.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedLogin.data;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(`${process.env.DATABASE_URL}/auth/login`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  const validatedToken = TokenSchema.safeParse(data.token);
  const validatedUserType = UserType.safeParse(data.userType);
  const validatedEmail = EmailSchema.safeParse(data.email);
  if (
    validatedToken.success &&
    validatedUserType.success &&
    validatedEmail.success
  ) {
    const tokenValue = validatedToken.data;
    const userTypeValue = validatedUserType.data;
    const emailValue = validatedEmail.data;
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    cookies().set("session", tokenValue, { expires, httpOnly: true });
    cookies().set("userType", userTypeValue, { expires, httpOnly: true });
    cookies().set("email", emailValue, { expires, httpOnly: true });
  } else {
    return { error: "Invalid credentials" };
  }
  return { success: "Email sent", role: `${process.env.CUSTOMER}` };
};

export const logout = async () => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  cookies().delete("session");
  cookies().delete("userType");
  await fetch(`${process.env.DATABASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  redirect("/auth/login");
};

export const registerCustomer = async (
  values: z.infer<typeof RegisterCustomerSchema>
) => {
  const validatedFields = RegisterCustomerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, contact, birthdate, userServiceCare } =
    validatedFields.data;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contactNo", contact);
  formData.append("birthDate", birthdate.toISOString().split("T")[0]);
  try {
    const response = await fetch(
      `${process.env.DATABASE_URL}/auth/register/customer`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    return { error: "User already exists" };
  }
  return { success: "User Created" };
};
export const registerCaregiver = async (
  values: z.infer<typeof RegisterCaregiverSchema>
) => {
  const validatedFields = RegisterCaregiverSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    email,
    password,
    name,
    contact,
    birthdate,
    userServiceCare,
    type,
    description,
    offerings,
  } = validatedFields.data;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contactNo", contact);
  formData.append("birthDate", birthdate.toISOString().split("T")[0]);
  formData.append("type", type);
  formData.append("description", description);
  const charList: string[] = offerings.split(/,\s/);
  charList.forEach((offering) => {
    formData.append(`offerings`, offering);
  });
  try {
    const response = await fetch(
      `${process.env.DATABASE_URL}/auth/register/provider`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    return { error: "User already exists" };
  }
  return { success: "User Created" };
};

export const postRequest = async (
  values: z.infer<typeof CustomerRequestSchema>
) => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const formData = new FormData();
  formData.append("requestTitle", values.requestTitle);
  formData.append("requestDetails", values.requestDetails);
  formData.append("requestLocation", values.requestLocation);
  const res = await fetch(`${process.env.DATABASE_URL}/request`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: formData,
  });
  const data = await res.json();
  // const validatedRequest = RequestSchema.safeParse(data);
  if (data.error) {
    return { error: data.error };
  }
  revalidatePath("/customer/dashboard");
  return { success: "Request Added" };
};

export const postOffer = async (
  values: z.infer<typeof ProviderOfferSchema>
) => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const formData = new FormData();
  formData.append("offerDetails", values.offerDetails);
  formData.append("requestId", values.requestId.toString());
  const res = await fetch(`${process.env.DATABASE_URL}/offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: formData,
  });
  const data = await res.json();
  if (data.error) {
    console.log(data.error);
    return { error: data.error };
  }
  console.log(data);
  //   const validatedRequest = RequestSchema.safeParse(data);
  revalidatePath("/customer/dashboard");
  return { success: "Request Added" };
};
