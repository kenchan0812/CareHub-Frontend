"use server";
import { CookiesSchema, RequestSchema, reqSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
export const postOffer = async (values: any) => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const formData = new FormData();
  const res = await fetch(`${process.env.DATABASE_URL}/offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: values,
  });
  const data = await res.json();
  //   const validatedRequest = RequestSchema.safeParse(data);
  console.log(data);
  revalidatePath("/customer/dashboard");
};
