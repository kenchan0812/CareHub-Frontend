"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { login } from "@/server/actions";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { toast } from "@/components/ui/use-toast";
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    //server side
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Logged in",
          });
          router.refresh();
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/role"
    >
      <h1 className="text-3xl font-bold mb-2 text-custom-action">Login</h1>
      <p className="text-balance text-muted-foreground mb-10 text-custom-lightGreen">
        Enter your email below to login to your account
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-2/3"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled={isPending}
                      className="text-custom-action"
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
                      type="password"
                      placeholder="Enter your password"
                      disabled={isPending}
                      className="text-custom-action"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full bg-[#8a9e61]"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
