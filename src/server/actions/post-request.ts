"use server";
import { CookiesSchema, RequestSchema, reqSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
export const postRequest = async (values: any) => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const formData = new FormData();
  formData.append("requestDetails", values.requestDetails);
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
  const validatedRequest = RequestSchema.safeParse(data);

  revalidatePath("/customer/dashboard");
};
