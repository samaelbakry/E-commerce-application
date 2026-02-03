"use client";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../ui/button";

export default function UserAddress() {
  const form = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    // resolver:zodResolver()
  });

  return (
    <>
      <form>
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
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details:</FieldLabel>
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
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City:</FieldLabel>
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
          <Button className="font-bold cursor-pointer w-1/2 text-md ">
            {form.formState.isSubmitting ? (
              <ImSpinner9 className="size-4 animate-spin" />
            ) : (
              "Add address"
            )}
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-3 capitalize">
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          street name : 120 pt street
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          phone: 01010010011
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          address details: 120 pt street
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          city: giza
        </span>
      </div>
    </>
  );
}
