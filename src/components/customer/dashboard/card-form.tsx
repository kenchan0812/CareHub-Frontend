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
import { CustomerRequestSchema } from "@/schemas";
import { postRequest } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface isOpen {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const CardForm = (setter: isOpen) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CustomerRequestSchema>>({
    resolver: zodResolver(CustomerRequestSchema),
    defaultValues: {
      requestDetails: "",
    },
  });
  const onSubmit = (values: z.infer<typeof CustomerRequestSchema>) => {
    setError("");
    //server side
    startTransition(() => {
      postRequest(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "Request Successfully Submitted",
          });
          setter.setOpen(false);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="requestTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requestDetails"
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
          <FormField
            control={form.control}
            name="requestLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Location"
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
