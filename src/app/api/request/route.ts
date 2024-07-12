import { CookiesSchema, CustomerRequestIdSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = true;
//Fetches the user data from the backend
// export async function POST(request: NextRequest) {
//   const cookieStore: unknown = cookies().get("session");
//   const validatedCookie = CookiesSchema.safeParse(cookieStore);
//   const values: z.infer<typeof RequestSchema> = await request.json();
//   const formData = new FormData();
//   formData.append("requestDetails", values.requestDetails);
//   const res = await fetch(`${process.env.DATABASE_URL}/request`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${
//         validatedCookie.success ? validatedCookie.data.value : ""
//       }`,
//     },
//     body: formData,
//   });
//   const data = await res.json();
//   const validatedUser = RequestSchema.safeParse(data);
//   return NextResponse.json(validatedUser.success ? validatedUser.data : null);
// }

export async function GET(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("requestId");
  const res = await fetch(
    `${process.env.DATABASE_URL}/offer/request?requestId=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          validatedCookie.success ? validatedCookie.data.value : ""
        }`,
      },
    }
  );
  const data = await res.json();
  // const validatedRequest = RequestsSchema.safeParse(data);
  // return NextResponse.json(
  //   validatedRequest.success ? validatedRequest.data : null
  // );
  return NextResponse.json({ data });
}
export async function PUT(request: NextRequest) {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const offerId = await request.json();
  const formData = new FormData();
  formData.append("offerId", offerId);
  console.log(formData);
  const res = await fetch(`${process.env.DATABASE_URL}/offer/accept`, {
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
  // const validatedRequest = RequestSchema.safeParse(data);
  return NextResponse.json({ data });
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
  const validatedRequest = CustomerRequestIdSchema.safeParse(data);
  return NextResponse.json(
    validatedRequest.success ? validatedRequest.data : null
  );
}
