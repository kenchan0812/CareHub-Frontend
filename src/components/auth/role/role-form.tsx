"use client";

import { useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { RoleButton } from "@/components/auth/role/role-buttons";
// import { ProviderProfileCreation } from "@/components/auth/provider-profile-creation";
import { useRouter } from "next/navigation";
export const RoleForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      router.push("/auth/login");
    });
  };

  return (
    <div>
      <CardWrapper headerLabel="Before we start, are you a user, or a caregiver?">
        <div className="w-full space-y-14">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Choose your role</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Select the role that best describes your job
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <RoleButton
              label="Customer"
              link="/auth/register/customer"
              isPending={isPending}
            />
            <RoleButton
              label="Caregiver"
              link="/auth/register/care-provider"
              isPending={isPending}
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};
