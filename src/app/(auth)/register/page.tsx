"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "@/lib/authSchema/authSchema";
import { Input } from "@/components/ui/input";
import { ImSpinner9 } from "react-icons/im";
import { signUp } from "@/services/authServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  
  const navigate = useRouter()
  const form  = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver:zodResolver(registerSchema)
  });

  async function sendSignUpData(values:registerSchemaType){
    const response= await signUp(values)
    if(response.message === "success"){
        navigate.push("/login")
        toast.success("Registered successfully")
    }
    console.log(response);
  }

  return (
    <>
      <div className="max-w-3xl mx-auto py-5 m-2 md:text-left text-center">
        <h2 className="md:text-4xl text-xl font-semibold accent-color">
          Join us and start shopping today
        </h2>
        <p className="font-semibold second-color my-1">
          Create your account and get started
        </p>
        <form onSubmit={form.handleSubmit(sendSignUpData)} className="bg-blur my-3 space-y-3 p-3 mx-8 md:mx-0">
          <Controller
            name="name"
            control={form.control}
             render={({field , fieldState})=>(
            <Field  data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
                <Input
                {...field}
                id={field.name} 
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="text"/>
                <FieldError errors={[fieldState.error]} />
            </Field>)}
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
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
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor={field.name}>Re-password:</FieldLabel>
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
          <Button className="font-bold cursor-pointer w-1/2 text-md md:translate-x-45">{form.formState.isSubmitting ? <ImSpinner9  className="size-4 animate-spin"/> : "Register"}</Button>
        </form>
        
      </div>
    </>
  );
}

