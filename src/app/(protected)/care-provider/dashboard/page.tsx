import { revalidate } from "@/app/api/request/route";
import OfferCard from "@/components/careprovider/dashboard/offer-card";
import OfferPanel from "@/components/careprovider/dashboard/offer-panel";
import Contact from "@/components/home-section/contact";
import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RequestPage = async ({
  searchParams,
}: {
  searchParams: { offerId: string };
}) => {
  const search = searchParams.offerId;
  const cookieSession: unknown = cookies().get("session");
  const validatedSession = CookiesSchema.safeParse(cookieSession);
  const cookieEmail: unknown = cookies().get("email");
  const validatedEmail = CookiesSchema.safeParse(cookieEmail);

  const getAll = await fetch(`${process.env.DATABASE_URL}/request/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        validatedSession.success ? validatedSession.data.value : ""
      }`,
    },
  });
  const dataAll = await getAll.json();

  // redirect(`/care-provider/dashboard?offerId=0`);
  // if (searchParams.requestId) {
  //   const requestId = props.props[0];
  //   onSelectedRow(0, requestId);
  // }
  return (
    <div>
      {dataAll.length > 0 ? (
        <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white mb-32">
          <div className="flex h-full ">
            <div className=" p-8 flex w-full gap-3">
              <div className="w-1/3">
                <OfferCard
                  props={dataAll}
                  validatedEmail={validatedEmail}
                  validatedSession={validatedSession}
                />
              </div>
              <div className="w-2/3">
                <OfferPanel props={dataAll} validatedEmail={validatedEmail} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white">
          <div className="flex h-[400px] justify-center items-center">
            <div className="text-center">
              Looks like there is no requests right now. Check back soon for
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
