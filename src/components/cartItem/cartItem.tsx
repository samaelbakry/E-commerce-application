"use client";

import { deleteCartProduct, updateCartProduct } from "@/actions/cartAction";
import { cartProductI } from "@/interfaces/cart";
import { cartContext } from "@/providers/cartDataProvider";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

interface cartItemsPropsI {
  product: cartProductI;
  setProducts: (products: cartProductI[]) => void;
}

export default function CartItem({ product, setProducts }: cartItemsPropsI) {
  const { handleCartNumber } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function deleteProduct(prodId: string) {
    try {
      setIsLoading(true);
      const response = await deleteCartProduct(prodId);
      if (response?.status === "success") {
        toast.success("Product Removed Successfully");
        setProducts(response.data.products);
        handleCartNumber();
      } else {
        toast.error("Failed To Remove Product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProduct(prodId: string, updatedCount: number) {
    if (updatedCount < 1) {
      deleteProduct(prodId);
      return;
    }
    try {
      setIsLoading(true);
      const response = await updateCartProduct(prodId, updatedCount);
      if (response?.status === "success") {
        toast.success("Product Quantity Updated Successfully");
        setProducts(response.data.products);
        handleCartNumber();
      } else {
        toast.error("Failed To Update Product Quantity");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-b border-stone-200/60 bg-transparent group">
      <div className="flex items-center gap-6">
        <div className="relative overflow-hidden bg-white border border-stone-200 rounded-xl p-4 shrink-0 transition-colors duration-300 group-hover:border-stone-300">
          <div className="w-24 h-24 flex items-center justify-center mix-blend-multiply">
            <Image
              src={product.product.imageCover}
              width={120}
              height={120}
              alt={product.product.title}
              className="object-contain max-h-full w-auto"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-medium">
              {product.product.brand?.name} • {product.product.category?.name}
            </span>
            <h4 className="text-base font-medium text-stone-900 tracking-tight line-clamp-1">
              {product.product.title.split("", 25).join("")}
            </h4>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={isLoading}
              onClick={() => updateProduct(product.product._id, product.count - 1)}
              className="size-7 flex items-center justify-center border border-stone-200 rounded-lg text-stone-600 bg-white hover:border-stone-400 disabled:opacity-50 transition-colors"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold w-8 text-center text-stone-900">
              {product.count}
            </span>
            <button
              disabled={isLoading}
              onClick={() => updateProduct(product.product._id, product.count + 1)}
              className="size-7 flex items-center justify-center border border-stone-200 rounded-lg text-stone-600 bg-white hover:border-stone-400 disabled:opacity-50 transition-colors"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-4 shrink-0 border-t sm:border-t-0 border-stone-200/40 pt-4 sm:pt-0">
        <div className="space-y-0.5 sm:text-right">
          <span className="block text-lg font-bold text-stone-900 tracking-tight">
            {product.price * product.count}{" "}
            <span className="text-[10px] font-normal text-stone-500 font-mono">EGP</span>
          </span>
          <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider">
            {product.count} × {product.price} EGP
          </span>
        </div>

        <button
          disabled={isLoading}
          onClick={() => deleteProduct(product.product._id)}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-red-600 disabled:opacity-50 transition-colors py-1 pl-2 sm:pl-0"
        >
          {isLoading ? (
            <ImSpinner9 className="size-3 animate-spin text-stone-400" />
          ) : (
            <>
              <span>Remove</span>
              <Trash2 className="size-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}