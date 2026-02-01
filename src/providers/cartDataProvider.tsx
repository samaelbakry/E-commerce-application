"use client"
import { getLoggedUserCart } from "@/actions/cartAction"
import { addToProductToWishlist, getUserWishlist } from "@/actions/wishlistAction"
import { cartI, cartQuantityI } from "@/interfaces/cart"
import { wishlistI } from "@/interfaces/wishlist"
import React, { createContext, useEffect, useState } from "react"
import { number } from "zod"

export const cartContext = createContext<cartQuantityI>({noOfCartItems:0 , handleCartNumber:()=>{} , noOfwishlistItems:0  })

export default function CartDataProvider({ children }: { children:React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState<number>(0)
    const [noOfwishlistItems, setNoOfwishlistItems] = useState<number>(0)

    async function handleCartNumber() {
        const data:cartI = await getLoggedUserCart()
        const wishdata:wishlistI = await getUserWishlist()
        const totalCartNo = data.data.products.reduce((accu , prod) => prod.count + accu , 0 )
        setNoOfCartItems(totalCartNo)
        setNoOfwishlistItems(wishdata.count)
    }

    useEffect(() => {
    handleCartNumber()
    }, [])
    
  return <>
  <cartContext.Provider value={{ noOfCartItems , handleCartNumber , noOfwishlistItems}}>
    {children}
  </cartContext.Provider>
  </>
}
