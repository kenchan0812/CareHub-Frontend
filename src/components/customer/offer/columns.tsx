"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type request = {
  id: string;
  requestDetails: string;
};

export const columns: ColumnDef<request>[] = [
  {
    accessorKey: "requestDetails",
    header: "Request Details",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      const router = useRouter();
      const onSubmit = async () => {
        const res = fetch("/api/request", {
          method: "DELETE",
          body: JSON.stringify(request),
        });
        const data = await res;
        if (data.ok) {
          router.refresh();
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onSubmit()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
