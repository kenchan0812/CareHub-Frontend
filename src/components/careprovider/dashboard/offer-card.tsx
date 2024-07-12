"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const OfferCard = (props: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const onSelectedRow = (row: number, item: any) => {
    current.set("offerId", row.toString());
    current.set("email", item.customer.email);
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  };
  useEffect(() => {
    if (current.get("offerId") === "0") {
      onSelectedRow(0, props.props[0]);
    }
  }, []);
  return (
    <div>
      {props.props.map((item: any, index: number) => (
        <Card
          key={item.requestId}
          className="flex flex-col rounded-md mb-2 hover:cursor-pointer hover:shadow-lg hover:shadow-custom-lightGreen min-w-80 h-[200px] transition-all"
          onClick={() => {
            onSelectedRow(index, item);
          }}
        >
          <CardHeader className="p-3 ">
            <div className="flex justify-between">
              <div>
                <CardTitle>{item.requestTitle}</CardTitle>
                <CardDescription>{item.requestLocation}</CardDescription>
              </div>
              <Badge variant="secondary" className="h-4 text-xs font-medium ">
                {item.requestStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="line-clamp-3">{item.requestDetails}</div>
          </CardContent>
          <CardFooter className="justify-end p-3 h-full items-end text-xs font-medium">
            posted on: {item.requestDateCreated.substring(0, 10)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OfferCard;
