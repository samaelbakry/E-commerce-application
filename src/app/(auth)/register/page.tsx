"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, registerSchemaType } from "@/lib/authSchema/authSchema";
import { signUp } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

export default function Register() {
  const navigate = useRouter();
  const form = useForm<registerSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function sendSignUpData(values: registerSchemaType) {
    const response = await signUp(values);
    if (response.message === "success") {
      navigate.push("/login");
      toast.success("Registered successfully");
    }
    console.log(response);
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
            Join us and start{" "}
            <span className="font-serif italic text-primary">shopping today</span>
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed mt-2">
            Create your account and get started
          </p>
        </div>

        <form onSubmit={form.handleSubmit(sendSignUpData)} className="space-y-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm focus:outline-none transition-colors ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-stone-200 focus:border-stone-900"
                  }`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm focus:outline-none transition-colors ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-stone-200 focus:border-stone-900"
                  }`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm focus:outline-none transition-colors ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-stone-200 focus:border-stone-900"
                  }`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm focus:outline-none transition-colors ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-stone-200 focus:border-stone-900"
                  }`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-[10px] uppercase font-mono text-stone-400 tracking-wider"
                >
                  Phone Number
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="tel"
                  placeholder="0123456789"
                  className={`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm focus:outline-none transition-colors ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-stone-200 focus:border-stone-900"
                  }`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[10px] text-red-500 mt-1"
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
              "Register"
            )}
          </Button>

          <div className="flex justify-center items-center text-sm font-light text-stone-500 mt-4">
            <span>Already have an account? &nbsp;</span>
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}