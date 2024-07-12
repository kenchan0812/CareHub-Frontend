import { Button } from "@/components/ui/button";
import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const cookieStore: unknown = cookies().get("userType");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  const data = validatedCookie.success ? validatedCookie.data : "";
  let link = "";
  if (validatedCookie.success) {
    const data = validatedCookie.data;
    link =
      data.value === "Customer"
        ? "/customer/dashboard"
        : "/care-provider/dashboard";
  }
  return (
    <div className="w-full h-[600px] bg-custom-lighterGreen flex justify-center text-custom-action">
      <div className="w-[1300px]">
        <div className="grid grid-cols-2 items-center">
          <div className=" max-w-xl">
            <div className="text-6xl font-bold mb-5 text-cusomt-action">
              Discover Your Perfect Care Providers Today
            </div>
            <div className="text-[#747474] mb-5">
              Our platform simplifies the search process, connecting you with
              qualified caregivers, maids, and senior care specialists in your
              area.
            </div>
            <Button className="bg-custom-green hover:bg-custom-onHover">
              <Link href={link}>Join Us Now</Link>
            </Button>
          </div>
          <div>
            <Image
              src="/hero.png"
              alt="hero"
              width={640}
              height={640}
              className="mt-[8.7rem] -z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
