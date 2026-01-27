"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/lib/authSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";
import {signIn} from "next-auth/react"


export default function Login() {
  const navigate = useRouter()
    const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver:zodResolver(loginSchema)
  });
  
  async function sendLogInData(values:loginSchemaType){
    // const response= await signIn(values)
    // if(response.message === "success"){
    //     navigate.push("/")
    //     toast.success("Logged in Successfully !")
    // }
    // console.log(response);

    const response= await signIn( "credentials", {
      redirect:true,
      email:values.email,
      password:values.password
    })
    console.log(response)
    if(response?.ok){
       navigate.push("/")
      toast.success("Logged in Successfully !")
    }else{
      toast.error(response?.error)
    }
  }

  
  return <> 
  <div className="max-w-3xl mx-auto py-5 m-2 md:text-left text-center">
        <h2 className="md:text-4xl text-xl font-semibold accent-color">
          Good to see you again!
        </h2>
        <p className="font-semibold second-color my-1">
          Log in and pick up where you left off
        </p>
        <form onSubmit={form.handleSubmit(sendLogInData)} className="bg-blur my-3 space-y-3 p-3 mx-8 md:mx-0">
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
          
           <Button className="font-bold cursor-pointer w-1/2 text-md md:translate-x-45">{form.formState.isSubmitting ? <ImSpinner9  className="size-4 animate-spin"/> : "Login"}</Button>
        </form>
        
      </div>
  </>
}
