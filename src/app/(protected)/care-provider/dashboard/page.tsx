import { CookiesSchema, RequestSchema } from "@/schemas";
import { cookies } from "next/headers";
import AddCard from "@/components/customer/dashboard/add-card";
import DataTable from "@/components/careprovider/dashboard/table";
import {
  columns,
  onRequest,
} from "@/components/careprovider/dashboard/columns";
import CardForm from "@/components/customer/dashboard/card-form";

export const fetchThat = (props: any) => {
  return props;
};
const Dashboard = async () => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(`${process.env.DATABASE_URL}/request/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  const data = await res.json();
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
