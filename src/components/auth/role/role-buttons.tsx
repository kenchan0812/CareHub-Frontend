"use client";

import Link from "next/link";
interface RoleButtonProps {
  label: string;
  onClick?: () => void;
}
export const RoleButton = ({ label, onClick }: RoleButtonProps) => {
  return (
    <button
      className="flex items-center justify-center p-4 rounded-lg border border-gray-200 bg-white shadow-sm text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
      type="button"
      onClick={onClick}
    >
      <div>{label}</div>
    </button>
  );
};
