import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  console.log(request);
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
  console.log("data");
  // const validatedRequest = RequestsSchema.safeParse(data);
  // return NextResponse.json(
  //   validatedRequest.success ? validatedRequest.data : null
  // );
  return NextResponse.json(data);
}
