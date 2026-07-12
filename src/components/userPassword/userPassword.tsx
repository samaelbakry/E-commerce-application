"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserDataPasswordSchema,
  updateUserDataPasswordSchemaType,
} from "@/lib/userDataSchema/userDataSchema";
import { updateUserPassword } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserPassword() {
  const navigate = useRouter();

  const form = useForm<updateUserDataPasswordSchemaType>({
    mode: "all",
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updateUserDataPasswordSchema),
  });

  async function updatePassword(values: updateUserDataPasswordSchemaType) {
    const response = await updateUserPassword(values);
    if (response) {
      toast.success("Your password updated successfully");
      navigate.push("/login");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(updatePassword)}
      className="space-y-4 py-2"
    >
      <div className="flex flex-col gap-4">
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-[11px] font-mono uppercase tracking-wider text-stone-500"
              >
                Current Access Cipher
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="current-password"
                type="password"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-[10px] text-red-600 font-mono mt-0.5"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-[11px] font-mono uppercase tracking-wider text-stone-500"
              >
                New Access password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
                type="password"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-[10px] text-red-600 font-mono mt-0.5"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1.5"
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-[11px] font-mono uppercase tracking-wider text-stone-500"
              >
                Verify New password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
                type="password"
                className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-[10px] text-red-600 font-mono mt-0.5"
                />
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
              Updating...
            </>
          ) : (
            "Commit Cipher Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
