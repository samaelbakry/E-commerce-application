"use client";
import { CircleMinusIcon, HeartPlus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { addProduct } from "@/actions/cartAction";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { cartContext } from "@/providers/cartDataProvider";
import { redirect } from "next/navigation";
import {addToProductToWishlist, deleteProductFromWishlist,} from "@/actions/wishlistAction";
import { productI } from "@/interfaces/products";

interface addToCartI {
  prodId: string;
  wishlistPage?: boolean;
  wishlistProducts?: productI[];
  setWishlistProducts?: (data: productI[]) => void;
}

export default function AddToCart({ prodId , wishlistPage , wishlistProducts , setWishlistProducts }: addToCartI) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const { handleCartNumber } = useContext(cartContext);

  async function addProductToCart(prodId: string) {

    try {
      setIsLoading(true);
      const response = await addProduct(prodId);
      console.log(response);
      if (response?.status === "success") {
        toast.success(response?.message);
        handleCartNumber();
      } else {
        toast.error("Failed To Add Product");
      }
    } catch (error: any) {
      toast.error(error.message);
      redirect("/register");
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(prodId: string) {

    const alreadyOnWishlist = wishlistProducts?.some(
      (prod) => prod._id === prodId,
    );
    if (alreadyOnWishlist) {
      toast.info("Product already in your wishlist");
      return;
    }

    try {
      setIsLoading(true);
      const response = await addToProductToWishlist(prodId);
      console.log(response);

      if (response?.status === "success") {
        toast.success(response?.message);
        setIsWishlisted(true);
        setWishlistProducts?.(response.data);
         handleCartNumber();
      } else {
        toast.error("Failed To Add to wishlist");
      }
    } catch (error: any) {
      toast.error(error.message);
      redirect("/register");
    } finally {
      setIsLoading(false);
    }

  }

  async function deleteWishlist(prodId: string) {

    try {
      setIsLoading(true);
      const data = await deleteProductFromWishlist(prodId);
      if (data?.status === "success") {
         toast.success(data?.message);
         setWishlistProducts?.(wishlistProducts!.filter((prod) => prod._id !== prodId) )
         handleCartNumber();
      } else {
        toast.error("Failed remove product");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <>
      <CardFooter className="flex items-center gap-2 cursor-pointer">
        <Button disabled={isLoading} onClick={() => {  addProductToCart(prodId); }} className="w-1/2 grow cursor-pointer">
          {isLoading ? ( <ImSpinner9 className="size-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart />
              Add to Cart
            </>
          )}
        </Button>

        {/* TO REMOVE THE HEART BTN FROM WISHLIST PAGE AND APPLY REMOVE WISHLIST BTN */}

        {wishlistPage ? (
          <button className="cursor-pointer" disabled={isLoading} onClick={() => {deleteWishlist(prodId); }} >
          <CircleMinusIcon className="text-red-700" />
          </button>
        ) : (
          <button disabled={isLoading} onClick={() => {addToWishlist(prodId);}} className="cursor-pointer">
          <HeartPlus className={`cursor-pointer transition ${isWishlisted ? "text-red-300 fill-red-700" : ""}`}/>
          </button>
        )}
      </CardFooter>
    </>
  );
}

//prev => !prev
