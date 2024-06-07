"use server";
import * as z from "zod";
import { LoginSchema, TokenSchema } from "@/schemas";
import { cookies } from "next/headers";
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
  const token = await data.token;
  const validatedToken = TokenSchema.safeParse(token);

  if (validatedToken.success) {
    const value = validatedToken.data;
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    cookies().set("session", value, { expires, httpOnly: true });
  } else {
    return { error: "Invalid credentials" };
  }

  return { success: "Email sent", role: `${process.env.CUSTOMER}` };
};
