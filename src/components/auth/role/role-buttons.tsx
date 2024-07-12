import Link from "next/link";

interface RoleButtonProps {
  label: string;
  isPending?: boolean;
  link?: string;
}
export const RoleButton = ({ label, isPending, link }: RoleButtonProps) => {
  return (
    <div>
      <Link
        href={`${link}`}
        className="flex items-center justify-center p-4 rounded-3xl border border-gray-200 bg-custom-green shadow-sm text-2xl font-bold transition-colors hover:bg-custom-action text-white w-[250px] h-[250px]"
      >
        {label}
      </Link>
    </div>
  );
};
