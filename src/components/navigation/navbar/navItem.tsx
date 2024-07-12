import { CookiesSchema } from "@/schemas";
import { cookies } from "next/headers";
import Link from "next/link";

const NavItem = () => {
  const cookieStore: unknown = cookies().get("userType");
  const validatedCookie = CookiesSchema.safeParse(cookieStore);
  let link = "";
  let isRequest = "";
  if (validatedCookie.success) {
    const data = validatedCookie.data;
    link =
      data.value === "Customer"
        ? "/customer/dashboard?offerId=0"
        : "/care-provider/dashboard?offerId=0";
    isRequest = data.value === "Customer" ? "Request" : "Offer";
  }
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="/home" className="flex items-center gap-2">
        <span className="text-custom-nav text-2xl font-bold">CareHub</span>
      </Link>
      <Link
        href="/home"
        className="  hover:text-custom-onHover text-custom-nav"
      >
        Home
      </Link>
      {isRequest && (
        <Link href={link} className="hover:text-custom-onHover text-custom-nav">
          {isRequest}
        </Link>
      )}
      <Link
        href="#contact"
        className="hover:text-custom-onHover text-custom-nav"
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default NavItem;
