"use client";

import { useState } from "react";
import { CardWrapper } from "../card-wrapper";
import { RoleButton } from "@/components/auth/role/role-buttons";
// import { ProviderProfileCreation } from "@/components/auth/provider-profile-creation";
import { LoginForm } from "../login/login-form";
import { useRouter } from "next/navigation";
export const RoleForm = () => {
  const router = useRouter();

  return (
    <div>
      <CardWrapper headerLabel="Before we start, are you a user, or a caregiver?">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Choose your role</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Select the role that best describes your job
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <RoleButton
              label="Customer"
              onClick={() => {
                router.push("/auth/register/customer");
              }}
            />
            <RoleButton
              label="Caregiver"
              onClick={() => {
                router.push("/auth/register/care-provider");
              }}
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};
