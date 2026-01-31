"use client"
import { HeartPlus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { addProduct } from "@/actions/cartAction";
import { toast } from "sonner";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";


export default function AddToCart({prodId}:{prodId:string}) {
  const [isLoading , setIsLoading]= useState<boolean>(false)
 async function addProductToCart(prodId:string) {
   try {
    setIsLoading(true)
    const response = await addProduct(prodId)
    console.log(response);
     if(response?.status ==="success"){
      toast.success(response?.message)
    }else{
      toast.error(response?.error)
    }

   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false)
   }

  }
  return <>
  <CardFooter className="flex items-center gap-2 cursor-pointer">
        <Button onClick={()=>{addProductToCart(prodId)}} className="w-1/2 grow cursor-pointer">{isLoading ? <ImSpinner9  className="size-4 animate-spin"/>  : <><ShoppingCart/>Add to Cart</>}</Button>
        <HeartPlus/>
  </CardFooter>
   
  </>
}
