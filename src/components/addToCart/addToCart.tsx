"use client"
import { HeartPlus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { addProduct } from "@/actions/cartAction";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { cartContext } from "@/providers/cartDataProvider";
import { redirect } from "next/navigation";


export default function AddToCart({prodId}:{prodId:string}) {
  const [isLoading , setIsLoading]= useState<boolean>(false)
    const {handleCartNumber} = useContext(cartContext)

 async function addProductToCart(prodId:string) {
   try {
    setIsLoading(true)
    const response = await addProduct(prodId)
    console.log(response);
     if(response?.status ==="success"){
      toast.success(response?.message)
      handleCartNumber()
    }else{
      toast.error("Failed To Add Product")
    }
   } catch (error:any) {
    toast.error(error.message)
    redirect("/register")
   }finally{
    setIsLoading(false)
   }
  }
  
  return <>
  <CardFooter className="flex items-center gap-2 cursor-pointer">
        <Button disabled={isLoading} onClick={()=>{addProductToCart(prodId)}} className="w-1/2 grow cursor-pointer">{isLoading ? <ImSpinner9  className="size-4 animate-spin"/>  : <><ShoppingCart/>Add to Cart</>}</Button>
        <HeartPlus/>
  </CardFooter>
   
  </>
}
