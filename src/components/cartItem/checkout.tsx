"use client";
import { clearCartProducts } from "@/actions/cartAction";
import { cartDataI, cartI, cartProductI } from "@/interfaces/cart";
import { cartContext } from "@/providers/cartDataProvider";
import { Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast, Toaster } from "sonner";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { checkoutSchema, checkoutSchemaType, egyptCities } from "@/lib/addressSchema/addressSchema";
import { addCashOrder, addVisaOrder} from "@/actions/ordersAction";

interface CheckoutI {
  setProducts: (products: cartProductI[]) => void;
  Cart: cartI | null;
  CartData: cartDataI | null;
}


export default function Checkout({ setProducts, Cart, CartData }: CheckoutI) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleCartNumber } = useContext(cartContext);
  const cartId = Cart?.cartId as string

  const form = useForm({
    mode: "all",
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function clear() {
    try {
      setIsLoading(true);
      const response = await clearCartProducts();
      console.log(response);
      if (response?.message === "success") {
        toast.success("Your cart is empty now");
        setProducts([]);
        handleCartNumber();
      } else {
        toast.error("Failed To Clear Your Cart");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOrder(values:checkoutSchemaType) {
    if(!Cart?.cartId){
      toast.error("Cart not ready yet")
      return;
    }
    const userOrder= {
        details: values.details,
        phone:values.phone,
        city:values.city
    }
    try {
    if(values.type === "cash"){
          const data = await addCashOrder(cartId, userOrder)
          console.log(data);
          if (data?.status === "success") {
          toast.success(data.message);
          form.reset()
          ;}
    }else{
      const data = await addVisaOrder(cartId, userOrder)
      console.log(data);
      if(data?.status === "success"){
         window.open(data.session.url)
      }
    }
    
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <>
      <h6 className="text-lg font-semibold m-1">CHECKOUT PAYMENT</h6>
      <div className="border border-gray-300 rounded-2xl shadow p-4 mx-2">
        <h6 className="text-2xl font-bold">Order Summary</h6>
        <div className="flex items-center justify-between">
          <span>total items: {Cart?.numOfCartItems} items</span>
          <span className="text-lg">{CartData?.totalCartPrice} EGP</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">shipping</span>
          <span className="font-bold accent-color text-lg">free</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg">total </span>
          <span className="font-bold accent-color text-lg">
            {CartData?.totalCartPrice} EGP
          </span>
        </div>
        <hr />
        <form onSubmit={form.handleSubmit(handleOrder)}>
          <div className="flex flex-col items-center gap-4 mt-3">
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
                    {egyptCities.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <RadioGroup className="w-fit flex flex-row items-center"
                value={field.value}
                onValueChange={field.onChange}
                 orientation="horizontal">
                  <Field data-invalid={fieldState.invalid} orientation="horizontal">
                    <RadioGroupItem value="cash" id="cash" />
                    <FieldContent>
                      <FieldLabel htmlFor="cash">Cash</FieldLabel>
                    </FieldContent>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="visa" id="visa"  />
                    <FieldContent>
                      <FieldLabel htmlFor="visa">Visa</FieldLabel>
                    </FieldContent>
                  </Field>
                </RadioGroup>
              )}
            />
            <button className="bg-gray-100 w-full font-semibold accent-color md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer duration-600 mb-2 shadow hover:bg-cyan-700 hover:text-white">
              PAY Now!
            </button>
          </div>
        </form>
        
        <div className="flex justify-end m-3 gap-3">
             <Link href="/products">
          <button className="bg-cyan-700 w-full font-semibold text-white md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer duration-600 shadow hover:bg-white hover:text-cyan-700">
            Continue Shopping
          </button>
        </Link>
          <button
            onClick={clear}
            className="delete-btn flex items-center gap-1"
          >
            {isLoading ? (
              <ImSpinner9 className="size-4 animate-spin" />
            ) : (
              <>
                {" "}
                Clear Cart
                <Trash2 />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
