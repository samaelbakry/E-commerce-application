"use client";

import { clearCartProducts } from "@/actions/cartAction";
import { addCashOrder, addVisaOrder } from "@/actions/ordersAction";
import { cartDataI, cartI, cartProductI } from "@/interfaces/cart";
import { checkoutSchema, checkoutSchemaType, egyptCities } from "@/lib/addressSchema/addressSchema";
import { cartContext } from "@/providers/cartDataProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, MapPin, Phone, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface CheckoutI {
  setProducts: (products: cartProductI[]) => void;
  Cart: cartI | null;
  CartData: cartDataI | null;
}

export default function Checkout({ setProducts, Cart, CartData }: CheckoutI) {
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isClearingCart, setIsClearingCart] = useState<boolean>(false);
  const { handleCartNumber } = useContext(cartContext);
  const cartId = Cart?.cartId as string;

  const form = useForm<checkoutSchemaType>({
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
      setIsClearingCart(true);
      const response = await clearCartProducts();
      if (response?.message === "success") {
        toast.success("Your cart is empty now");
        setProducts([]);
        handleCartNumber();
      } else {
        toast.error("Failed To Clear Your Cart");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsClearingCart(false);
    }
  }

  async function handleOrder(values: checkoutSchemaType) {
    if (!Cart?.cartId) {
      toast.error("Cart not ready yet");
      return;
    }

    const userOrder = {
      details: values.details,
      phone: values.phone,
      city: values.city,
    };

    try {
      setIsFormSubmitting(true);
      if (values.type === "cash") {
        const data = await addCashOrder(cartId, userOrder);
        if (data?.status === "success") {
          toast.success(data.message || "Order placed successfully");
          form.reset();
          setProducts([]);
          handleCartNumber();
        } else {
          toast.error(data?.message || "Failed to process order");
        }
      } else {
        const data = await addVisaOrder(cartId, userOrder);
        if (data?.status === "success" && data?.session?.url) {
          window.open(data.session.url, "_self");
        } else {
          toast.error("Failed to initialize gateway");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Secure Processing
        </h2>
        <h1 className="text-2xl font-light tracking-tight text-stone-900 uppercase mt-1">
          Checkout Manifest
        </h1>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-4">
            Order Summary
          </h3>
          <div className="space-y-3 font-mono text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-wide flex items-center gap-2">
                <ShoppingBag className="size-3.5 text-stone-400" /> Allotted Items
              </span>
              <span className="font-semibold text-stone-900">{Cart?.numOfCartItems || 0} units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-wide flex items-center gap-2">
                <MapPin className="size-3.5 text-stone-400" /> Logistics/Shipping
              </span>
              <span className="text-emerald-700 font-medium uppercase tracking-wider">Free</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-stone-100 pt-3 mt-1">
              <span className="text-stone-900 uppercase tracking-widest font-semibold text-[11px]">
                Total Commitment
              </span>
              <span className="text-xl font-bold text-stone-900 tracking-tight font-sans">
                {CartData?.totalCartPrice || 0}{" "}
                <span className="text-[10px] font-normal text-stone-400 font-mono">EGP</span>
              </span>
            </div>
          </div>
        </div>

        <hr className="border-stone-100" />

        <form onSubmit={form.handleSubmit(handleOrder)} className="space-y-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
             Delivery Destination
          </h3>

          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel htmlFor={field.name} className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  Street Details / Architectural Marker
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="text"
                  placeholder="e.g. 14 El-Gesh St, Floor 3, Apt 5"
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-stone-900 transition-colors placeholder:text-stone-300"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[11px] font-mono text-red-600 mt-1" />}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name} className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                    Comms / Phone Line
                  </FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="tel"
                      placeholder="01---------"
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:bg-white focus:border-stone-900 transition-colors font-mono placeholder:text-stone-300"
                    />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[11px] font-mono text-red-600 mt-1" />}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                  <FieldLabel htmlFor={field.name} className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                    Regional Hub / City
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    list="cities"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="text"
                    placeholder="Select or enter city"
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-stone-900 transition-colors placeholder:text-stone-300"
                  />
                  <datalist id="cities">
                    {egyptCities.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[11px] font-mono text-red-600 mt-1" />}
                </Field>
              )}
            />
          </div>

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  Settlement Paradigm
                </span>
                <RadioGroup
                  className="grid grid-cols-2 gap-4 w-full"
                  value={field.value}
                  onValueChange={field.onChange}
                  orientation="horizontal"
                >
                  <label
                    htmlFor="cash"
                    className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                      field.value === "cash"
                        ? "border-stone-900 bg-stone-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <RadioGroupItem value="cash" id="cash" className="sr-only" />
                    <div className={`size-3.5 rounded-full border flex items-center justify-center shrink-0 ${field.value === "cash" ? "border-stone-900" : "border-stone-300"}`}>
                      {field.value === "cash" && <div className="size-2 rounded-full bg-stone-900" />}
                    </div>
                    <FieldContent className="space-y-0.5">
                      <span className="block text-xs font-semibold text-stone-900 uppercase font-mono tracking-wider">Cash</span>
                      <span className="block text-[10px] text-stone-400 font-mono uppercase">On Hand Drop</span>
                    </FieldContent>
                  </label>

                  <label
                    htmlFor="visa"
                    className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                      field.value === "visa"
                        ? "border-stone-900 bg-stone-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <RadioGroupItem value="visa" id="visa" className="sr-only" />
                    <div className={`size-3.5 rounded-full border flex items-center justify-center shrink-0 ${field.value === "visa" ? "border-stone-900" : "border-stone-300"}`}>
                      {field.value === "visa" && <div className="size-2 rounded-full bg-stone-900" />}
                    </div>
                    <FieldContent className="space-y-0.5 flex-1 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-xs font-semibold text-stone-900 uppercase font-mono tracking-wider">Visa</span>
                        <span className="block text-[10px] text-stone-400 font-mono uppercase">Online Clearing</span>
                      </div>
                      <CreditCard className="size-4 text-stone-400 shrink-0" />
                    </FieldContent>
                  </label>
                </RadioGroup>
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isFormSubmitting || isClearingCart}
            className="w-full bg-stone-900 text-stone-50 font-mono text-xs font-medium uppercase tracking-widest py-3 px-4 rounded-xl shadow-sm transition-all hover:bg-stone-800 disabled:opacity-50 flex items-center justify-center min-h-[42px]"
          >
            {isFormSubmitting ? (
              <ImSpinner9 className="size-4 animate-spin text-stone-400" />
            ) : (
              <span>Execute Order</span>
            )}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/60 pt-4 font-mono text-[10px]">
          <Link href="/products" className="w-full sm:w-auto text-stone-400 hover:text-stone-900 uppercase tracking-widest transition-colors py-1 text-center sm:text-left">
            ← Return to index
          </Link>

          <button
            onClick={clear}
            disabled={isFormSubmitting || isClearingCart}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-stone-400 hover:text-red-600 disabled:opacity-50 uppercase tracking-widest transition-colors py-1"
          >
            {isClearingCart ? (
              <ImSpinner9 className="size-3 animate-spin text-stone-400" />
            ) : (
              <>
                <span>Purge Cart</span>
                <Trash2 className="size-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}