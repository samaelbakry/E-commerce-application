"use client";

import { getLoggedUserCart } from "@/actions/cartAction";
import CartItem from "@/components/cartItem/cartItem";
import Checkout from "@/components/cartItem/checkout";
import { cartDataI, cartI, cartProductI } from "@/interfaces/cart";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Cart() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<cartProductI[]>([]);
  const [cartData, setCartData] = useState<cartDataI | null>(null);
  const [cart, setCart] = useState<cartI | null>(null);

  async function getUserCart() {
    try {
      setIsLoading(true);
      const data: cartI = await getLoggedUserCart();
      
      if (data?.data) {
        setProducts(data.data.products || []);
        setCart(data);
        setCartData(data.data);
      }
    } catch (error) {
      console.error("Failed to recover allocations:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  const handleProductsUpdate = (updatedProducts: cartProductI[]) => {
    setProducts(updatedProducts);
    
    const derivedTotalItems = updatedProducts.reduce((acc, item) => acc + item.count, 0);
    const derivedTotalPrice = updatedProducts.reduce((acc, item) => acc + item.price * item.count, 0);

    if (cart) {
      setCart({
        ...cart,
        numOfCartItems: derivedTotalItems,
      });
    }
    if (cartData) {
      setCartData({
        ...cartData,
        totalCartPrice: derivedTotalPrice,
      });
    }
  };

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen relative flex flex-col justify-between overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  User Manifest
                </h2>
                <h1 className="text-3xl font-light tracking-tight text-stone-900 uppercase">
                  Shopping Cart
                </h1>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-stone-400">
                 Account Holds ({cart?.numOfCartItems || 0} Units)
              </span>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <ImSpinner9 className="size-6 animate-spin text-stone-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  Retrieving current session data...
                </span>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-stone-200 rounded-2xl bg-white/40 backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  Your allocation matrix is empty.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-200/60 bg-transparent">
                {products.map((prod) => (
                  <CartItem 
                    key={prod._id || prod.product?._id} 
                    product={prod} 
                    setProducts={handleProductsUpdate}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Checkout 
              setProducts={handleProductsUpdate} 
              Cart={cart} 
              CartData={cartData}
            />
          </div>

        </div>
      </div>
    </div>
  );
}