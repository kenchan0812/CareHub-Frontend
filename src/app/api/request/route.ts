import { CookiesSchema, RequestSchema, RequestsSchema } from "@/schemas";
import { cookies } from "next/headers";
import router from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = true;
//Fetches the user data from the backend
export async function POST(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const values: z.infer<typeof RequestSchema> = await request.json();
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
  const validatedUser = RequestSchema.safeParse(data);
  return NextResponse.json(validatedUser.success ? validatedUser.data : null);
}

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
  const validatedRequest = RequestsSchema.safeParse(data);
  return NextResponse.json(
    validatedRequest.success ? validatedRequest.data : null
  );
}
export async function DELETE(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const req = await request.json();
  const res = await fetch(
    `${process.env.DATABASE_URL}/request?requestId=${req.requestId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
    }
  );
  const data = await res.json();
  const validatedRequest = RequestsSchema.safeParse(data);
  console.log(req.requestId);
  return NextResponse.json(
    validatedRequest.success ? validatedRequest.data : null
  );
}
