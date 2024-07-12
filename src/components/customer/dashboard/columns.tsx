"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { RequestSchema } from "@/schemas";
import { toast } from "@/components/ui/use-toast";

export type request = z.infer<typeof RequestSchema>;

const CellComponent = ({ row }: any) => {
  const request: request = row.original;
  const router = useRouter();
  const onDelete = async () => {
    const res = fetch("/api/request", {
      method: "DELETE",
      body: JSON.stringify(request),
    });
    const data = await res;
    if (data.ok) {
      toast({
        description: "Request Successfully Deleted",
      });
      router.refresh();
    }
  };
  const onCheck = () => {
    router.push(`/customer/dashboard/${request.requestId}?offerId=0`);
  };
  return (
    <div className="flex flex-col gap-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={onDelete}
        className="w-12 md:w-20 border-custom-red hover:bg-custom-red hover:text-custom-lighterGreen"
      >
        Delete
      </Button>
      <Button
        size="sm"
        onClick={onCheck}
        className="w-12 md:w-20 bg-custom-green hover:bg-custom-action"
      >
        Check
      </Button>
    </div>
  );
};

export const columns: ColumnDef<request>[] = [
  {
    accessorKey: "requestDetails",
    header: "Request Details",
    cell: ({ row }) => {
      return <div className="lg:w-[400px]">{row.original.requestDetails}</div>;
    },
  },
  {
    accessorKey: "requestStatus",
    header: "Request Status",
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.requestStatus}</Badge>;
    },
  },
  {
    accessorKey: "createdDate",
    header: "Date Created",
  },

  {
    id: "actions",
    cell: CellComponent,
  },
];
