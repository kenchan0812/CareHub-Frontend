"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

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
    const response = await fetch(`${process.env.DATABASE_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    return { error: "User already exists" };
  }
  return { success: "User Created" };
};
