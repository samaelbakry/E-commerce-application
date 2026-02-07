import { clearCartProducts } from "@/actions/cartAction";
import { cartDataI, cartI, cartProductI } from "@/interfaces/cart";
import { cartContext } from "@/providers/cartDataProvider";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

interface CheckoutI {
  setProducts: (products: cartProductI[]) => void
  Cart: cartI | null
  CartData: cartDataI | null
}


export default function Checkout({setProducts , Cart , CartData}:CheckoutI) {
    const [isLoading , setIsLoading]= useState<boolean>(false)
    const {handleCartNumber} = useContext(cartContext)

  
   async function clear() {
   try {
    setIsLoading(true)
    const response = await clearCartProducts()
    console.log(response);
     if(response?.message ==="success"){
      toast.success("Your cart is empty now")
       setProducts([])
       handleCartNumber()
    }else{
      toast.error("Failed To Clear Your Cart")
    }
   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false)
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
          <span className="font-bold accent-color text-lg">{CartData?.totalCartPrice} EGP</span>
        </div>
        <button className="bg-gray-100 w-full font-semibold accent-color md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer mb-2 shadow">
          proceed to checkout
        </button>
        <Link href="/products">
          <button className="bg-cyan-800 w-full font-semibold text-white md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer shadow">
            Continue Shopping
          </button>
        </Link>
        <div className="flex justify-end m-3">
          <button onClick={clear} className="delete-btn flex items-center gap-1">
           {isLoading ? <ImSpinner9  className="size-4 animate-spin"/> : <> Clear Cart<Trash2 /></>}
          </button>
        </div>
      </div>
    </>
  );
}
