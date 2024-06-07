"use server";
import * as z from "zod";
import { CookiesSchema, ServiceSchema } from "@/schemas";
import { cookies } from "next/headers";

export const service = async (values: z.infer<typeof ServiceSchema>) => {
  const validatedFields = ServiceSchema.safeParse(values);
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { type, description, offerings } = validatedFields.data;

  const serviceData = new FormData();
  serviceData.append("type", type);
  serviceData.append("description", description);
  offerings.forEach((offering) => {
    serviceData.append(`offerings`, offering);
  });

  try {
    const response = await fetch(`${process.env.DATABASE_URL}/user/service`, {
      method: "POST",
      body: serviceData,
      headers: {
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    return { error: "User already a caregiver" };
  }
  return { success: "Caregiver created" };
};
