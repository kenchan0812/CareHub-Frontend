"use server";

import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const { name, contactNo, birthdate } = await request.json();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("contactNo", contactNo);
  formData.append("birthdate", birthdate);
  console.log(formData);
  const res = await fetch(`${process.env.DATABASE_URL}/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
    body: formData,
  });
  const data = await res.json();
  // console.log(data);
  // if (data.error) {
  //   console.log(data.error);
  //   return { error: data.error };
  // }
  //   const validatedRequest = RequestSchema.safeParse(data);
  // return NextResponse.json(res);
  // );
}
