"use client"
import { deleteCartProduct, updateCartProduct } from "@/actions/cartAction";
import { cartProductI } from "@/interfaces/cart";
import { cartContext } from "@/providers/cartDataProvider";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

interface cartItemsPropsI{
product:cartProductI,
setProducts:(products:cartProductI[])=>void
}

export default function CartItem({product , setProducts }:cartItemsPropsI) {

  const { handleCartNumber } =useContext(cartContext);
  const [isLoading , setIsLoading]= useState<boolean>(false)

 async function deleteProduct(prodId:string) {
   try {
    setIsLoading(true)
    const response = await deleteCartProduct(prodId)
    console.log(response);
     if(response?.status ==="success"){
      toast.success("Product Removed Successfully")
      setProducts(response.data.products)
      handleCartNumber()
    }else{
      toast.error("Failed To Remove Product")
    }
   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false)
   }
  }

 async function updateProduct(prodId:string , updatedCount:number) {
   try {
    setIsLoading(true)
    const response = await updateCartProduct(prodId , updatedCount)
    console.log(response);
     if(response?.status ==="success"){
      toast.success("Product Quantity Updated Successfully")
      setProducts(response.data.products)
      handleCartNumber()
    }else{
      toast.error("Failed To Update Product Quantity")
    }
   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false)
   }
  }
  

  return (
    <>
     <div className="flex flex-wrap items-center justify-between  m-4 bg-blur">
        <div className="flex items-center md:gap-2 gap-0">
          <Image src={product.product.imageCover} width={150} height={150} alt={product.product.title} className="object-cover p-4 rounded-3xl" />
          <div className="flex flex-col gap-3">
            <span>{product.product.title.split("" , 25).join("")}</span>
            <span>{ product.product.brand.name}. {product.product.category.name}</span>
            <div className="flex items-center gap-2">
              <Minus onClick={()=>{updateProduct(product.product._id , product.count-1)}} className="size-6 bg-gray-200 shadow rounded-lg p-1 text-lg cursor-pointer hover:scale-105" />
              <span>{product.count}</span>
              <Plus onClick={()=>{updateProduct(product.product._id , product.count+1)}} className="size-6 bg-gray-200 shadow rounded-lg p-1 text-lg cursor-pointer hover:scale-105" />
            </div>
            <span className="text-gray-500">Price of {product.count <=1 ? `${product.count} item` : `${product.count} items` }</span>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center translate-x-6 sm:translate-0 m-3 gap-10 ">
          <span>{product.price * product.count} EGP</span>
          <button onClick={()=>{deleteProduct(product.product._id)}} className="delete-btn flex items-center gap-0.5">
           {isLoading  ? <ImSpinner9  className="size-4 animate-spin"/>  : <> Remove <Trash2 /></>}
          </button>
        </div>
      </div>
    
  
     
    </>
  );
}
