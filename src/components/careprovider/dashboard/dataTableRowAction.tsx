"use client";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CardForm from "@/components/careprovider/dashboard/card-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onRequest: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onRequest,
}: DataTableRowActionsProps<TData>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <CardForm props={row.original} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataTableRowActions;
