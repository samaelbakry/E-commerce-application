"use client"
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDataSchema, updateUserDataSchemaType } from "@/lib/userDataSchema/userDataSchema";
import { updateUserData } from "@/actions/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserData() {
  const navigate = useRouter()
   const form = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
    resolver:zodResolver(updateUserDataSchema)
  });

  async function updateData(values:updateUserDataSchemaType) {
    const response = await updateUserData(values)
    if(response){
      toast.success("Your data updated successfully")
      navigate.push("/login")

    }else{
      toast.error("something went wrong")
    }
  }

  return <>
   <form onSubmit={form.handleSubmit(updateData)}>
        <div className="flex flex-col gap-3 py-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone:</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="number"
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
