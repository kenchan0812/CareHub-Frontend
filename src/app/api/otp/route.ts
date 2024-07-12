import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  console.log(email, code);
  const res = await fetch(
    `${process.env.DATABASE_URL}/auth/user/verify?email=${email}&code=${code}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  // const validatedRequest = RequestsSchema.safeParse(data);
  // return NextResponse.json(
  //   validatedRequest.success ? validatedRequest.data : null
  // );
  return NextResponse.json({ data });
}
