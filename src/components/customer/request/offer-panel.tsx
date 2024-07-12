"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const OfferPanel = (props: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchId = searchParams.get("offerId") || 0;
  const searchEmail = searchParams.get("email") || "";

  const dataId = props.props[searchId];
  const accepted = dataId.offerStatus === "ACCEPTED" ? false : true;
  const acceptOffer = async (offerId: string) => {
    const res = await fetch("/api/request", {
      method: "PUT",
      body: JSON.stringify(offerId),
    });
    if (res.ok) {
      router.push(`/chat?email=${searchEmail}`);
      router.refresh();
    }
  };

  return (
    <>
      <Card
        key={dataId.requestId}
        className="flex flex-col rounded-md mb-2  min-w-80 h-[600px]  sticky top-10 shadow-md shadow-custom-lightGreen"
      >
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="font-bold text-2xl">
                {dataId.serviceProvider.name}
              </CardTitle>
              <CardDescription>{dataId.serviceProvider.email}</CardDescription>
              <Badge className="bg-custom-green hover:bg-custom-action mr-2">
                {dataId.offerStatus}
              </Badge>
              <Badge className="bg-custom-green hover:bg-custom-action">
                {dataId.serviceProvider.userServiceCare.type}
              </Badge>
            </div>
            {accepted ? (
              <Button
                className="bg-custom-green hover:bg-custom-action"
                onClick={() => acceptOffer(dataId.offerId)}
              >
                Accept Offer
              </Button>
            ) : (
              <Button
                className="bg-custom-green hover:bg-custom-action"
                onClick={() => router.push(`/chat?email=${searchEmail}`)}
              >
                Message
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>{dataId.offerDetails}</div>
        </CardContent>
      </Card>
    </>
  );
};

export default OfferPanel;
