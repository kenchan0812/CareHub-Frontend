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
import { RequestSchema } from "@/schemas";
import { postRequest } from "@/server/actions/post-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CardForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RequestSchema>>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      requestDetails: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => postRequest(data))}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="requestDetails"
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
