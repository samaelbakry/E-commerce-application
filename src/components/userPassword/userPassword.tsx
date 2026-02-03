"use client"
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDataPasswordSchema, updateUserDataPasswordSchemaType } from "@/lib/userDataSchema/userDataSchema";
import { updateUserPassword } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserPassword() {
  const navigate = useRouter()
    const form = useForm({
    mode: "all",
    defaultValues: {
      currentPassword: "",
      password:"",
      rePassword:"",
    },
    resolver:zodResolver(updateUserDataPasswordSchema)
  });
  async function updatePassword(values:updateUserDataPasswordSchemaType) {
    const response = await updateUserPassword(values)
    if(response){
      toast.success("Your password updated successfully")
      navigate.push("/login")
    }else{
      toast.error("something went wrong")
    }
  }
  return <>
   <form onSubmit={form.handleSubmit(updatePassword)}>
        <div className="flex flex-col gap-3 py-5">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current password:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

           <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New password:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
         
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>RePassword:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
         <Button className="font-bold cursor-pointer w-1/2 text-md ">{form.formState.isSubmitting ? <ImSpinner9 className="size-4 animate-spin"/> : "change"}</Button>
        </div>
    </form>
  </>

  
}
