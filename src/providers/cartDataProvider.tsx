"use client"
import { getLoggedUserCart } from "@/actions/cartAction"
import { cartI, cartQuantityI } from "@/interfaces/cart"
import React, { createContext, useEffect, useState } from "react"

export const cartContext = createContext<cartQuantityI>({noOfCartItems:0 , handleCartNumber:()=>{}})

export default function CartDataProvider({ children }: { children:React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState<number>(0)

    async function handleCartNumber() {
        const data:cartI = await getLoggedUserCart()
        const totalCartNo = data.data.products.reduce((accu , prod) => prod.count + accu , 0 )
        setNoOfCartItems(totalCartNo)
    }
    useEffect(() => {
    handleCartNumber()
    }, [])
    
  return <>
  <cartContext.Provider value={{ noOfCartItems , handleCartNumber}}>
    {children}
  </cartContext.Provider>
  </>
}
