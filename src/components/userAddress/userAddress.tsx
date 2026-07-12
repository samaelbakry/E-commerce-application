"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Trash2, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, addressSchemaType, egyptCities } from "@/lib/addressSchema/addressSchema";
import { addUserAddress, getUserAddress, removeUserAddress } from "@/actions/addressAction";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface addressI {
  name: string;
  details: string;
  phone: string;
  city: string;
  _id: string;
}

export default function UserAddress() {
  const [address, setAddress] = useState<addressI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<addressSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema)
  });

  async function handleAddress(values: addressSchemaType) {
    const response = await addUserAddress(values);
    if (response) {
      toast.success(response?.message || "Address saved successfully");
      form.reset();
    } else {
      toast.error("Something went wrong please try again");
    }
    const { data } = await getUserAddress();
    if (data?.length) {
      setAddress(data[data.length - 1]);
    }
  }

  async function removeAddress(id: string) {
    try {
      setIsLoading(true);
      const response = await removeUserAddress(id);
      if (response) {
        toast.success(response?.message || "Address removed successfully");
        setAddress(null);
      } else {
        toast.error("Failed to remove address");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchAddress() {
      const { data } = await getUserAddress();
      if (data?.length) {
        setAddress(data[data.length - 1]);
      }
    }
    fetchAddress();
  }, []);

  return (
    <div className="space-y-6">
      {address && (
        <div className="border border-stone-200 bg-stone-50/60 rounded-xl p-4 relative overflow-hidden transition-all duration-200">
          <div className="absolute top-0 right-0 p-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => removeAddress(address._id)}
              className="text-stone-400 hover:text-red-600 p-1.5 rounded-md hover:bg-white border border-transparent hover:border-stone-200 transition-all duration-200 cursor-pointer disabled:opacity-50"
              title="Remove address placement"
            >
              {isLoading ? (
                <Loader2 className="size-3.5 animate-spin text-stone-500" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </button>
          </div>

          <div className="flex gap-3 items-start pr-8">
            <div className="p-2 rounded-lg bg-white border border-stone-200 text-emerald-600 shrink-0 mt-0.5">
              <MapPin className="size-3.5" />
            </div>
            
            <div className="space-y-2 text-stone-900 w-full">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">Active Routing Node</span>
                <h5 className="text-sm font-bold tracking-wide text-stone-800 capitalize">{address.name}</h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-2 border-t border-dashed border-stone-200 text-xs font-light text-stone-600">
                <div>
                  <span className="font-mono text-[10px] text-stone-400 block uppercase">Destination Details</span>
                  <p className="capitalize text-stone-700">{address.details}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-stone-400 block uppercase">Region / City</span>
                  <p className="capitalize text-stone-700">{address.city}</p>
                </div>
                <div className="sm:col-span-2 mt-0.5">
                  <span className="font-mono text-[10px] text-stone-400 block uppercase">Contact Communications</span>
                  <p className="font-mono text-stone-700">{address.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleAddress)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                  Street Identification / Label
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="street-address"
                  type="text"
                  className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
                )}
              </Field>
            )}
          />

          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                  Building, Apartment, or Floor Details
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                  className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                  Communications Line (Phone)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="tel"
                  type="tel"
                  className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md font-mono"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
                )}
              </Field>
            )}
          />

          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1.5">
                <FieldLabel htmlFor={field.name} className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                  Regional Hub City
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  list="cities"
                  aria-invalid={fieldState.invalid}
                  autoComplete="address-level2"
                  type="text"
                  className="bg-white border-stone-200 focus-visible:ring-stone-400 h-9 text-xs rounded-md"
                />
                <datalist id="cities">
                  {egyptCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-[10px] text-red-600 font-mono mt-0.5" />
                )}
              </Field>
            )}
          />

        </div>

        <Button 
          type="submit"
          disabled={form.formState.isSubmitting} 
          className="w-full md:w-auto md:px-6 h-9 mt-2 text-xs font-mono uppercase tracking-wider bg-stone-900 hover:bg-stone-800 text-white transition-colors duration-200 cursor-pointer rounded-md flex items-center justify-center gap-2"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Registering Routing...
            </>
          ) : (
            "Save Address Coordinates"
          )}
        </Button>
      </form>
    </div>
  );
}