import Link from "next/link";
import { Package2 } from "lucide-react";
import Profile from "@/components/navigation/navbar/profile";
import { cookies } from "next/headers";
import { CookiesSchema } from "@/schemas";
import { z } from "zod";
import NavItem from "@/components/navigation/navbar/navItem";

type Data = z.infer<typeof CookiesSchema>;

const defaultData: Data = {
  name: "",
  value: "",
};

const Header = () => {
  const userType: unknown = cookies().get("userType");
  const validatedUserType = CookiesSchema.safeParse(userType);
  const userTypeCookie = validatedUserType.success
    ? validatedUserType.data
    : "";
  const mergedUserType = { ...defaultData, ...userTypeCookie };
  return (
    <header className="sticky top-0 z-10 flex h-16  gap-4  bg-background px-4 md:px-6 bg-custom-green justify-center shadow-sm">
      <div className="flex items-center justify-center w-[1300px]">
        <div className="flex w-full h-14 items-center lg:h-[74.4px]">
          <NavItem />
        </div>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto ">
            <Profile {...mergedUserType} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
