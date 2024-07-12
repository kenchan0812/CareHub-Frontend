import AddCard from "@/components/customer/dashboard/add-card";
import { CookiesSchema, RequestsSchema } from "@/schemas";
import { cookies } from "next/headers";

import { columns } from "@/components/customer/dashboard/columns";
import { DataTable } from "@/components/ui/data-table";
import { z } from "zod";
import Contact from "@/components/home-section/contact";

type request = z.infer<typeof RequestsSchema>;

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
  const transformedDataList = data.map((item: any) => ({
    requestId: item.requestId,
    email: item.customer.email,
    name: item.customer.name,
    contactNo: item.customer.contactNo,
    birthDate: item.customer.birthDate,
    photoId: item.customer.photoId,
    userServiceCare: item.customer.userServiceCare,
    createdDate: item.customer.createdDate.substring(0, 10),
    lastModifiedDate: item.customer.lastModifiedDate,
    requestDetails: item.requestDetails,
    requestStatus: item.requestStatus,
  }));
  return (
    <div>
      <div className="flex items-center justify-end">
        <AddCard />
      </div>
      <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white mb-32">
        <div className="container mx-auto py-10 min-h-[730px]">
          <DataTable
            columns={columns}
            data={transformedDataList}
            tableHeight="h-28"
          />
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Dashboard;
