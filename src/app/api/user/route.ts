import { CookiesSchema, UserSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//Fetches the user data from the backend
export async function GET() {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.DATABASE_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  const data = await res.json();
  const validatedUser = UserSchema.safeParse(data);
  return NextResponse.json(validatedUser.success ? validatedUser.data : null);
}
