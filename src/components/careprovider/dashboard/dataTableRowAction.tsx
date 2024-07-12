"use client";
import { Button } from "@/components/ui/button";

import CardForm from "@/components/careprovider/dashboard/card-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
interface DataTableRowActionsProps<TData>
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  row: any;
  onSuccess?: () => void;
  showTrigger?: boolean;
  setShowOfferDialog: Dispatch<SetStateAction<boolean>>;
}

const DataTableRowActions = <TData,>({
  row,
  onSuccess,
  showTrigger = true,
  setShowOfferDialog,
  ...props
}: DataTableRowActionsProps<TData>) => {
  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button>Add Request</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make new offer</DialogTitle>
          <DialogDescription>
            Make new offers here. Click Submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <CardForm row={row} setShowOfferDialog={setShowOfferDialog} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataTableRowActions;
