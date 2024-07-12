"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { FormSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useRouter, useSearchParams } from "next/navigation";

export const OTP = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const res = await fetch(`/api/otp?email=${email}&code=${values.pin}`, {
      method: "GET",
    });
    toast({
      description: "Your One Time Password has been sent.",
    });
    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <CardWrapper headerLabel="One Time Password">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col items-center justify-center h-full"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-5">
                <FormLabel className="text-3xl font-bold">
                  One-Time Password
                </FormLabel>
                <FormLabel className="text-balance text-muted-foreground mb-10">
                  Enter your email below to login to your account
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-1/3 mt-5 bg-custom-green hover:bg-custom-action"
          >
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
