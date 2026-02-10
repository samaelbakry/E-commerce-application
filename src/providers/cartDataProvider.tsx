"use client"
import { getLoggedUserCart } from "@/actions/cartAction"
import { getUserWishlist } from "@/actions/wishlistAction"
import { cartI, cartQuantityI } from "@/interfaces/cart"
import { wishlistI } from "@/interfaces/wishlist"
import React, { createContext, useEffect, useState } from "react"

export const cartContext = createContext<cartQuantityI>(
  {noOfCartItems:0 ,
   handleCartNumber:()=>{} , 
   noOfwishlistItems:0 ,
   isLoading :false,
  })
   

export default function CartDataProvider({ children }: { children:React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState<number>(0)
    const [noOfwishlistItems, setNoOfwishlistItems] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<cartI | undefined>(undefined)
 

    async function handleCartNumber() {
        try {
        setIsLoading(true)
        const data:cartI = await getLoggedUserCart()
        setData(data)
        const wishdata:wishlistI = await getUserWishlist()
        const totalCartNo= data.data.products.reduce((accu , prod) => prod.count + accu , 0 )
        setNoOfCartItems(totalCartNo)
        setNoOfwishlistItems(wishdata.count)
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false)
        }
    }

    useEffect(() => {
    handleCartNumber()
    }, [])
    
  return <>
  <cartContext.Provider value={{ noOfCartItems , handleCartNumber , noOfwishlistItems , isLoading , data}}>
    {children}
  </cartContext.Provider>
  </>
}
