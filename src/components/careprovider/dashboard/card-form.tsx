"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OfferSchema } from "@/schemas";
import { postOffer } from "@/server/actions/post-offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CardForm = (requestId: any) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OfferSchema>>({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      offerDetails: "",
    },
  });
  const onSubmit = (values: z.infer<typeof OfferSchema>) => {
    setError("");
    const formData = new FormData();
    formData.append("requestId", requestId.props.requestId);
    formData.append("offerDetails", values.offerDetails);
    startTransition(() => {
      postOffer(formData).then((data) => {});
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="offerDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="description"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CardForm;
