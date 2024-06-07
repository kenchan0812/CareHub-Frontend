"use server";
import * as z from "zod";
import { ServiceSchema, TokenSchema } from "@/schemas";
import { cookies } from "next/headers";

export const providerRegister = async (
  values: z.infer<typeof ServiceSchema>
) => {
  const validatedFields = ServiceSchema.safeParse(values);

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

  const registerData = new FormData();
  registerData.append("name", name);
  registerData.append("email", email);
  registerData.append("password", password);
  registerData.append("contactNo", contact);
  registerData.append("birthDate", birthdate.toISOString().split("T")[0]);

  const loginData = new FormData();
  loginData.append("email", email);
  loginData.append("password", password);

  const serviceData = new FormData();
  serviceData.append("type", type);
  serviceData.append("description", description);
  offerings.forEach((offering) => {
    serviceData.append(`offerings`, offering);
  });

  try {
    const registerResponse = await fetch(
      `${process.env.DATABASE_URL}/auth/register`,
      {
        method: "POST",
        body: registerData,
      }
    );
    if (!registerResponse.ok) {
      throw new Error(`HTTP error! Status: ${registerResponse.status}`);
    }
  } catch (error) {
    return { error: "User already exists" };
  }

  const loginResponse = await fetch(`${process.env.DATABASE_URL}/auth/login`, {
    method: "POST",
    body: loginData,
  });
  const data = await loginResponse.json();
  const token = await data.token;
  const validatedToken = TokenSchema.safeParse(token);

  if (validatedToken.success) {
    const value = validatedToken.data;
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
    cookies().set("session", value, { expires, httpOnly: true });
    cookies().set("isProvider", "true", { expires, httpOnly: true });
  } else {
    return { error: "Invalid credentials" };
  }
  try {
    const serviceResponse = await fetch(
      `${process.env.DATABASE_URL}/user/service`,
      {
        method: "POST",
        body: serviceData,
        headers: {
          Authorization: `Bearer ${validatedToken.data}`,
        },
      }
    );
    if (!serviceResponse.ok) {
      throw new Error(`HTTP error! Status: ${serviceResponse.status}`);
    }
  } catch (error) {
    return { error: "User already exists" };
  }

  return { success: "User Created" };
};
