"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_MENU_PROVIDER } from "@/components/navigation/sidenav/constants";

const SideNavProvider = () => {
  return (
    <div className="h-[880px]">
      <div className="flex h-80 w-full mt-14 ml-8">
        <span className="h-28 w-28 bg-zinc-300 rounded-lg" />
      </div>

      <div className="flex flex-col">
        {SIDENAV_MENU_PROVIDER.map((item, idx) => {
          return <MenuItem key={idx} item={item} />;
        })}
      </div>
    </div>
  );
};

export default SideNavProvider;

const MenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex flex-row space-x-4 items-center px-2 py-5 hover:bg-zinc-100 ${
        item.path === pathname ? "bg-zinc-100" : ""
      }`}
    >
      <span className="font-semibold text-xl flex">{item.title}</span>
    </Link>
  );
};
