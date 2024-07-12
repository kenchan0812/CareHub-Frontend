"use client";
import DataTableRowActions from "@/components/careprovider/dashboard/dataTableRowAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OfferPanel = (props: any) => {
  const [showOfferDialog, setShowOfferDialog] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchEmail = searchParams.get("email") || "";
  const searchOffer = searchParams.get("offerId") || 0;

  const dataOffer = props.props[searchOffer];

  return (
    <>
      <div className="flex gap-2 mr-5 justify-end">
        <DataTableRowActions
          open={showOfferDialog}
          onOpenChange={setShowOfferDialog}
          setShowOfferDialog={setShowOfferDialog}
          row={dataOffer}
          showTrigger={false}
        />
      </div>
      <Card
        key={dataOffer.requestId}
        className="flex flex-col rounded-md mb-2  min-w-80 h-[600px]  sticky top-10 shadow-md shadow-custom-lightGreen"
      >
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="font-bold text-2xl">
                {dataOffer.requestTitle}
              </CardTitle>
              <Badge className="bg-custom-green hover:bg-custom-action mr-2">
                {dataOffer.requestStatus}
              </Badge>
              <Badge className="bg-custom-green hover:bg-custom-action">
                {dataOffer.requestDateCreated.substring(0, 10)}
              </Badge>
              <CardDescription>{dataOffer.location}</CardDescription>
            </div>
            <div>
              <Button
                className="bg-custom-green hover:bg-custom-action mr-5"
                onClick={() => router.push(`/chat?email=${searchEmail}`)}
              >
                Chat
              </Button>
              <Button
                className="bg-custom-green hover:bg-custom-action"
                onClick={() => setShowOfferDialog(true)}
              >
                Make an Offer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>{dataOffer.requestDetails}</div>
        </CardContent>
      </Card>
    </>
  );
};

export default OfferPanel;
