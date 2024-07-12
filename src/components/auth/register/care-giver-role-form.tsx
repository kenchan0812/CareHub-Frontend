import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { registerCaregiver } from "@/server/actions";
import { RoleCaregiverSchema } from "@/schemas";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface CareGiverRoleFormProps {
  registerInfo: {
    email: string;
    password: string;
    name: string;
    contact: string;
    birthdate: Date;
  };
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const CareGiverRoleForm = ({
  registerInfo,
  setShowForm,
}: CareGiverRoleFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RoleCaregiverSchema>>({
    resolver: zodResolver(RoleCaregiverSchema),
    defaultValues: {
      type: "",
      description: "",
      offerings: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RoleCaregiverSchema>) => {
    setError("");
    const combinedData = {
      ...registerInfo,
      ...values,
    };
    startTransition(() => {
      registerCaregiver(combinedData).then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: "You Successfully Registered.",
          });
          router.push("/auth/otp?email=" + combinedData.email);
        }
      });
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Go back"
        backButtonFunction={() => setShowForm(true)}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maid">Maid</SelectItem>
                          <SelectItem value="Child Care">Child Care</SelectItem>
                          <SelectItem value="Senior Care">
                            Senior Care
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your description"
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
                name="offerings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What services do you offer? (separate with comma)"
                        disabled={isPending}
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

export default CareGiverRoleForm;
