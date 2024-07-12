import OfferCard from "@/components/customer/request/offer-card";
import OfferPanel from "@/components/customer/request/offer-panel";
import TopHeader from "@/components/customer/request/top-header";
import Contact from "@/components/home-section/contact";
import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import { z } from "zod";

const RequestPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore: unknown = cookies().get("session");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const res = await fetch(
    `${process.env.DATABASE_URL}/offer/request?requestId=${params.id}`,
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
  return (
    <div>
      <TopHeader />
      {data.length > 0 ? (
        <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white mb-32">
          <div className="flex h-full ">
            <div className=" p-8 flex w-full gap-3">
              <div className="w-1/3">
                <OfferCard props={data} />
              </div>
              <div className="w-2/3">
                <OfferPanel props={data} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white">
          <div className="flex h-[400px] justify-center items-center">
            <div className="text-center">
              Looks like there is no offers right now. Check back soon for
              updates!
            </div>
          </div>
        </div>
      )}
      <Contact />
    </div>
  );
};

export default RequestPage;
