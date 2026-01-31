"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addProduct(productId:string){
    const token = await getUserToken()
    try {
       const response = await fetch(`${API_URL}/cart`,{
        method:"post",
        body: JSON.stringify({productId:productId}),
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