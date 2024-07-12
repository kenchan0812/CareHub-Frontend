"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ProviderOfferInputSchema } from "@/schemas";
import { postOffer } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PostData {
  offerDetails: string;
  requestId: number;
}

const CardForm = ({ row, setShowOfferDialog }: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ProviderOfferInputSchema>>({
    resolver: zodResolver(ProviderOfferInputSchema),
    defaultValues: {
      offerDetails: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ProviderOfferInputSchema>) => {
    setError("");
    const postData: PostData = {
      ...values,
      requestId: row.requestId,
      offerDetails: values.offerDetails,
    };
    startTransition(() => {
      postOffer(postData).then((data) => {
        setError(data.error);
        if (!error) {
          toast({
            description: "Offer Successfully Submitted",
          });
          setShowOfferDialog(false);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-10">
          <FormField
            control={form.control}
            name="offerDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-36"
                    placeholder="description"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="w-full bg-custom-red"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full bg-custom-green hover:bg-custom-onHover"
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CardForm;
