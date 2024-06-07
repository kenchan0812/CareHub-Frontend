"use client";
import CardForm from "@/components/customer/dashboard/card-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RequestSchema } from "@/schemas";
import { z } from "zod";

const AddCard = () => {
  return (
    <div className="place-self-center mb-32">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="max-w-xs">
            Add Request
          </Button>
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
              <CardForm />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCard;
