"use client"

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDataSchema, updateUserDataSchemaType } from "@/lib/userDataSchema/userDataSchema";
import { updateUserData } from "@/actions/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserData() {
  const navigate = useRouter();
  
  const form = useForm<updateUserDataSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateUserDataSchema)
  });

  async function updateData(values: updateUserDataSchemaType) {
    const response = await updateUserData(values);
    if (response) {
      toast.success("Your data updated successfully");
      navigate.push("/login");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(updateData)} className="space-y-4 py-2">
      <div className="flex flex-col gap-4">
        
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                Operator Signature Name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="name"
                type="text"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
              )}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                Primary Routing Mailbox
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                type="email"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
              )}
            </Field>
          )}
        />
         
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
              <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                Communications Line (Phone)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="tel"
                type="tel"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md font-mono"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
              )}
            </Field>
          )}
        />

        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="w-full md:w-auto md:px-6 h-9 mt-2 text-xs font-mono uppercase tracking-wider bg-stone-900 hover:bg-stone-800 text-white transition-colors duration-200 cursor-pointer rounded-md flex items-center justify-center gap-2"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Updating Metadata...
            </>
          ) : (
            "Save Profile Metadata"
          )}
        </Button>
      </div>
    </form>
  );
}