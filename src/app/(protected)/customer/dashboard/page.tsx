import AddCard from "@/components/customer/dashboard/add-card";
import { CookiesSchema, RequestSchema } from "@/schemas";
import { cookies } from "next/headers";

import { columns } from "@/components/customer/offer/columns";
import { DataTable } from "@/components/customer/offer/table";
import { z } from "zod";

interface requestItem {
  requestDetails: string;
  id: number;
}
const Dashboard = async () => {
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
  console.log(data);
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>

      <AddCard />
    </div>
  );
};

export default Dashboard;
