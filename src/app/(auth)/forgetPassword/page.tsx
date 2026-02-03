"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { forgetPassSchema, forgetPassSchemaType } from '@/lib/authSchema/authSchema'
import { forgetPassword } from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { ImSpinner9 } from 'react-icons/im'
import { toast } from 'sonner'


export default function ForgetPassword() {
    const navigate = useRouter()
     const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
    },
    resolver:zodResolver(forgetPassSchema)
  })
  async function handlePassword(value:forgetPassSchemaType){
    const response = await forgetPassword(value)
    if(response.statusMsg === "success"){
        toast.success(response?.message)
        navigate.push("/verifyRestPassword")
    }
    
  }
  return <>
   <div className="max-w-3xl mx-auto py-5 m-2 md:text-left text-center">
        <h2 className="md:text-4xl text-xl font-semibold accent-color">
          Forget password
        </h2>
        <p className="font-semibold second-color my-1">
          please enter your email and wait for reset code
        </p>
        <form onSubmit={form.handleSubmit(handlePassword)} className="bg-blur my-3 space-y-3 p-3 mx-8 md:mx-0">
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
          <Button className="font-bold cursor-pointer text-md ">{form.formState.isSubmitting ? <ImSpinner9  className="size-4 animate-spin"/> : "submit"}</Button>
        </form>
        
      </div>
  </>
}
