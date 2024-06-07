import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";

const getRequests = async () => {
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
  return data;
};

const RequestList = async () => {
  const requests = await getRequests();
  return (
    <>
      {requests.map((request: any) => (
        <div key={request.requestId}>{request.requestDetails}</div>
      ))}
    </>
  );
};

export default RequestList;
