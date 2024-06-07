"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[850px] shadow-md">
      <div className="flex">
        <div className="m-auto w-full max-w-4xl rounded-lg bg-white">
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center gap-5 py-8 bg-[#A1A4E3] text-center">
              <div className="mb-8 w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">logo here</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {headerLabel}
              </h1>
            </div>
            <CardContent>
              {children}
              <CardFooter>
                {backButtonHref && backButtonLabel && (
                  <BackButton href={backButtonHref} label={backButtonLabel} />
                )}
              </CardFooter>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
};
