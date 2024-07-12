"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  backButtonFunction?: () => void;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  backButtonFunction,
}: CardWrapperProps) => {
  return (
    <Card className="w-[1260px] h-[800px] shadow-none rounded-3xl">
      <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-center gap-5 p-6 bg-[#8a9e61] rounded-3xl my-6 ml-6">
          <span className="text-custom-lighterGreen text-6xl font-semibold mb-7">
            CareHub
          </span>
          <h1 className="text-3xl font-bold hidden">{headerLabel}</h1>
        </div>
        <CardContent className="justify-center items-center">
          {children}
          <CardFooter>
            {backButtonHref && backButtonLabel && (
              <BackButton href={backButtonHref} label={backButtonLabel} />
            )}
            {backButtonFunction && (
              <Button
                onClick={backButtonFunction}
                variant="link"
                className="font-normal"
                size="sm"
              >
                {backButtonLabel}
              </Button>
            )}
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};
