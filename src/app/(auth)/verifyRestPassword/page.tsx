"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyResetCode } from "@/services/authServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

export default function VerifyRestPassword() {
  const navigate = useRouter();
  const form = useForm<{ verify: string }>({
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
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-white overflow-hidden">
      <div
        className="absolute inset-0 flex px-6 max-w-xl mx-auto pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1" />
      </div>

      <div className="w-full max-w-md relative z-10 mx-auto">
        <div className="mb-10 text-left">
          <h2 className="text-4xl font-light tracking-tight text-stone-900">
            Enter your{" "}
            <span className="font-serif italic text-primary">reset code</span>
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed mt-2">
            A 6-digit verification code was sent to your email address.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleVerifyCode)}
          className="space-y-6"
        >
          <Controller
            name="verify"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel
                  htmlFor="digits-only"
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Verification Code
                </FieldLabel>

                <div className="flex justify-center py-2">
                  <InputOTP
                    {...field}
                    aria-invalid={fieldState.invalid}
                    maxLength={6}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot
                        index={0}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-12 h-14 rounded-xl border border-stone-200 text-stone-900 text-lg font-semibold text-center focus:border-stone-900 transition-colors"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1 text-center"
                  />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold tracking-wide uppercase rounded-xl py-6 flex items-center justify-center shadow-sm transition-all mt-6 cursor-pointer"
          >
            {form.formState.isSubmitting ? (
              <ImSpinner9 className="size-4 animate-spin" />
            ) : (
              "Verify Code"
            )}
          </Button>

          <div className="flex justify-center items-center text-sm font-light text-stone-500 mt-4">
            <span>Didn&apos;t receive the code?&nbsp;</span>
            <Link
              href="/forgetPassword"
              className="font-semibold text-primary hover:underline"
            >
              Resend
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}