"use client"
import { getLoggedUserCart } from "@/actions/cartAction";
import CartItem from "@/components/cartItem/cartItem";
import Checkout from "@/components/cartItem/checkout";
import {cartDataI, cartI, cartProductI } from "@/interfaces/cart";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Cart() {
  const [isLoading , setIsLoading]= useState<boolean>(false)
  const [products, setProducts] = useState<cartProductI[] | []>([])
  const [cartData, setCartData] = useState<cartDataI | null>(null)
  const [cart, setCart] = useState<cartI | null>(null)

  async function getUserCart() {
  try {
    setIsLoading(true)
    const data: cartI = await getLoggedUserCart()
    await new Promise(res => setTimeout(res, 800)) 
    setProducts(data.data.products)
    setCart(data)
    setCartData(data.data)
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }
}

  useEffect(()=>{
  getUserCart()
  },[])
  
  return (
    <>
      <div className="max-w-7xl mx-auto my-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* CART REVIEW */}
          <div className="col-span-1 md:col-span-2 p-2">
            <header className="bg-gray-100 p-5 m-3 max-w-2xl rounded-xl shadow-xl flex items-center flex-wrap md:gap-0 gap-2 justify-between">
              <div>
                <h1 className="md:text-4xl text-xl font-semibold accent-color">
                  Shopping Cart
                </h1>
                   <p className="mt-2 text-md font-normal second-color">
                  Almost there! Review your cart 
                   </p>
              </div>
              <p><span className="accent-color">{cart?.numOfCartItems} Items </span> in your cart</p>
            </header>
            {products.length===0 && isLoading === false && <><div className="bg-blur font-semibold second-color text-base  md:text-lg flex items-center justify-center p-1 h-20 m-3"><span>Looks like you haven’t added anything yet</span></div> </>}
            {isLoading ? <div className="flex justify-center items-center my-5"> <ImSpinner9  className="size-8 my-5 animate-spin"/></div> 
            : <>
            {products.map((prod , index )=> <CartItem key={index} product={prod} setProducts={setProducts}/> )}
             </>}
            
          </div>
          {/* CHECKOUT PAYMENT */}
            <div className="col-span-1 md:col-span-2 p-2 my-10">
            <Checkout setProducts={setProducts} Cart={cart} CartData={cartData}/>
          </div>
        </div>
      </div>
    </>
  );
}
