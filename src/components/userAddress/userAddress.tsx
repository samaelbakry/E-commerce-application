"use client";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ImSpinner9 } from "react-icons/im";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, addressSchemaType, egyptCities } from "@/lib/addressSchema/addressSchema";
import { addUserAddress, getUserAddress, removeUserAddress } from "@/actions/addressAction";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface addressI{
  name:string,
  details:string,
  phone:string,
  city:string,
  _id:string
}

export default function UserAddress() {
  const [address, setAddress] = useState<addressI | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver:zodResolver(addressSchema)
  });

  async function handleAddress(values:addressSchemaType){
    const response = await addUserAddress(values)
    console.log(response);
    if(response){
      toast.success(response?.message)
      form.reset()
    }else{
      toast.error("Something went wrong please try again")
    }
    const {data} = await getUserAddress()
    setAddress(data[data.length -1])
    console.log(data);
  }

  async function removeAddress(id:string) {
    try {
      setIsLoading(true)
      const response = await removeUserAddress(id)
      console.log(response);
      if(response){
        toast.success(response?.message)
        setAddress(null)
      }else{
        toast.error("failed to remove address")
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    async function get() {
      const {data} = await getUserAddress()
      if(data?.length){
        setAddress(data[data.length -1])
      }
    }
    get()
  }, [])
  


  return (
    <>
      <form onSubmit={form.handleSubmit(handleAddress)}>
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
                  list="cities"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                />
                <datalist id="cities">
                  {egyptCities.map((city)=>(
                    <option key={city} value={city}/>
                  ))}
                </datalist>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={form.formState.isSubmitting} className="font-bold cursor-pointer w-1/2 text-md ">
            {form.formState.isSubmitting ? (
              <ImSpinner9 className="size-4 animate-spin" />
            ) : (
              "Add address"
            )}
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-3 capitalize">
       {address && <>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          street name : {address.name}
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          address details: {address.details}
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          phone: {address.phone}
        </span>
        <span className="block bg-gray-200 second-color p-3 rounded-lg text-cyan-50">
          city: {address.city}
        </span>
        <button onClick={()=>{removeAddress(address._id)}} className="delete-btn flex items-center w-1/3 ">
           { isLoading ? <ImSpinner9  className="size-4 animate-spin"/> : <> Remove address</>}
        </button>
       </>}
      </div>
    </>
  );
}
