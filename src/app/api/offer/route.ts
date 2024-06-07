import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.DATABASE_URL}/request`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  const data = await res.json();
  // const validatedRequest = RequestsSchema.safeParse(data);
  // return NextResponse.json(
  //   validatedRequest.success ? validatedRequest.data : null
  // );
  return NextResponse.json(data);
}
