// "use client";

// import * as z from "zod";
// import { CardWrapper } from "./card-wrapper";
// import { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { FormError } from "@/components/form-error";
// import { useRouter } from "next/navigation";
// import { LoginSchema, ProfileCreationSchema, ServiceSchema } from "@/schemas";
// import { Textarea } from "../ui/textarea";
// import { service } from "@/actions/service";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export const ProviderProfileCreation = () => {
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [error, setError] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   // const form = useForm<z.infer<typeof ProfileCreationSchema>>({
//   //   resolver: zodResolver(ProfileCreationSchema),
//   //   defaultValues: {
//   //     provider_name: "",
//   //     provider_location: "",
//   //     provider_description: "",
//   //     provider_services: "",
//   //   },
//   // });

//   const form = useForm<z.infer<typeof ServiceSchema>>({
//     resolver: zodResolver(ServiceSchema),
//     defaultValues: {
//       type: "",
//       description: "",
//       offerings: [],
//     },
//   });
//   const onSubmit = (values: z.infer<typeof ServiceSchema>) => {
//     setError("");
//     console.log(values);
//     startTransition(() => {
//       service(values).then((data) => {
//         setError(data.error);
//         if (!data.error) {
//           router.push(`/auth/login`);
//         }
//       });
//     });
//   };
//   return (
//     <div>
//       <CardWrapper
//         headerLabel="Set your profile"
//         backButtonLabel="Not your role?"
//         backButtonHref="/auth/role"
//       >
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="type"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Service Type</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Maid">Maid</SelectItem>
//                           <SelectItem value="Child Care">Child Care</SelectItem>
//                           <SelectItem value="Senior Care">
//                             Senior Care
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Enter your description"
//                         disabled={isPending}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="offerings"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Services Offered</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="What services do you offer? (separate with comma)"
//                         disabled={isPending}
//                         {...field}
//                         onChange={(event) => {
//                           const value = event.target.value;
//                           const offeringsList = value
//                             .split(",")
//                             .map((item) => item.trim());
//                           field.onChange({
//                             ...event,
//                             target: {
//                               ...event.target,
//                               value: offeringsList,
//                             },
//                           });
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormError message={error} />
//             <Button type="submit" className="w-full" disabled={isPending}>
//               Login
//             </Button>
//           </form>
//         </Form>
//       </CardWrapper>
//     </div>
//   );
// };
