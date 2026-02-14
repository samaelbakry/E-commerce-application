"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/lib/authSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";
import {signIn} from "next-auth/react"
import Link from "next/link";


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
    
    const response= await signIn("credentials", { // from next auth (for calling authorize fn)
     email:values.email,
      password:values.password,
      redirect:false,
    })
    console.log(response)
    
    if(response?.ok){
       toast.success("Logged in Successfully !")
       console.log(response)
       setTimeout(() => {
      navigate.push("/")
       }, 1000);
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
          
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Link href="/forgetPassword">
          <span className="hover:underline underline-offset-3 font-bold">Forget password ?</span>
            </Link>
             <Button className="font-bold cursor-pointer  text-md ">{form.formState.isSubmitting ? <ImSpinner9  className="size-4 animate-spin"/> : "Login"}</Button>
          </div>

        </form>
        
      </div>
  </>
}
