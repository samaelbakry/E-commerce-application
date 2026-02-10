"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface userOrderI{
    details:string,
    phone:string,
    city:string
}
export async function addCashOrder(id:string , userOrderData:userOrderI){
    const token = await getUserToken()
    
    try {
       const response = await fetch(`${API_URL}/orders/${id}`,{
        method:"post",
        body: JSON.stringify({"shippingAddress":userOrderData}),
        headers:{
            token,
            "Content-Type":"application/json"
        }
       }
       )
       const data = await response.json()
       return data    
    } catch (error) {
        console.log(error)
    }
}

export async function addVisaOrder(id:string , userOrderData:userOrderI){
    const token = await getUserToken()
    
    try {
       const response = await fetch(`${API_URL}/orders/checkout-session/${id}?url=http://localhost:3000`,{
        method:"post",
        body: JSON.stringify({"shippingAddress":userOrderData}),
        headers:{
            token,
            "Content-Type":"application/json"
        }
       }
       )
       const data = await response.json()
       return data    
    } catch (error) {
        console.log(error)
    }
}

