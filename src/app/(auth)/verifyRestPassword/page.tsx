"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyResetCode } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";


export default function VerifyRestPassword() {
  const navigate = useRouter();
  const form = useForm({
    mode: "all",
    defaultValues: {
      verify: "",
    },
    
  });

  async function handleVerifyCode(data: { verify: string }) {
  const response = await verifyResetCode({
    resetCode: data.verify,
  });
  console.log(response);
  
  if (response?.status === "Success") {
    toast.success(response.status);
    navigate.push("/resetPassword");
  }
  }
  return (
    <>
      <div className="max-w-3xl mx-auto py-5 m-2 md:text-left text-center">
         <h2 className="md:text-4xl text-xl font-semibold accent-color">
          Enter your reset code
        </h2>
        <p className="font-semibold second-color my-1">code was sent to your email</p>
        <form
          onSubmit={form.handleSubmit(handleVerifyCode)}
          className="bg-blur my-3 space-y-3 p-3 mx-8 md:mx-0"
        >
          <Controller
            name="verify"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-fit">
                <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
                <InputOTP  {...field} aria-invalid={fieldState.invalid} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Button className="font-bold cursor-pointer text-md ">
            {form.formState.isSubmitting ? (
              <ImSpinner9 className="size-4 animate-spin" />
            ) : (
              "verify"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
