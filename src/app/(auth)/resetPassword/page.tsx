"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassSchema, resetPassSchemaType } from "@/lib/authSchema/authSchema";
import { resetPassword } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

export default function ResetPassword() {
  
    const navigate = useRouter()
    const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver:zodResolver(resetPassSchema)
  });

  async function handleResetPassword(values:resetPassSchemaType) {
    const response = await resetPassword(values)
    console.log(response);
     if(response){
        toast.success("password updated successfully")
        navigate.push("/login")
    }else{
      toast.error(response?.message)
    }
  }

  return <>
 <div className="max-w-3xl mx-auto py-5 m-2 md:text-left text-center">
        <h2 className="md:text-4xl text-xl font-semibold accent-color">
          Reset Your Password
        </h2>
        <p className="font-semibold second-color my-1">
          enter your email and new password
        </p>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="bg-blur my-3 space-y-3 p-3 mx-8 md:mx-0">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor={field.name}>New Password:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <div className="flex items-center justify-between flex-wrap gap-2">
             <Button className="font-bold cursor-pointer  text-md ">{form.formState.isSubmitting ?
              <ImSpinner9  className="size-4 animate-spin"/> : "submit"}</Button>
          </div>

        </form>
        
      </div>
  </>
}
