"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "../card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { RegisterCustomerSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { registerCustomer } from "@/server/actions";
import { toast } from "@/components/ui/use-toast";

export const CustomerRegistrationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterCustomerSchema>>({
    resolver: zodResolver(RegisterCustomerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      contact: "",
      birthdate: new Date(),
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterCustomerSchema>) => {
    setError("");
    //server side
    startTransition(() => {
      registerCustomer(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Registered.",
          });
          router.push("/auth/otp?email=" + values.email);
        }
      });
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
      >
        <h1 className="text-3xl font-bold mb-2">Register</h1>
        <p className="text-balance text-muted-foreground mb-10">
          Enter your details to create an account
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-2/3"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isPending}
                        placeholder="Enter your contact"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex w-full justify-start text-left font-normal ",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            captionLayout="dropdown-buttons"
                            fromYear={new Date().getFullYear() - 120}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button
              type="submit"
              className="w-full bg-custom-green hover:bg-custom-action"
              disabled={isPending}
            >
              Create an account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
