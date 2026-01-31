"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addProduct(productId:string){
    const token = await getUserToken()
    if(!token){
        throw new Error("You must have account to do this action")
    }
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/cart`,{
        method:"post",
        body: JSON.stringify({productId}),
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

export async function getLoggedUserCart(){
    const token = await getUserToken()
    try {
       const response = await fetch(`${API_URL}/cart`,{
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

export async function deleteCartProduct(prodId:string){
    const token = await getUserToken()
    try {
       const response = await fetch(`${API_URL}/cart/${prodId}`,{
        method:"delete",
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
export async function clearCartProducts(){
    const token = await getUserToken()
    try {
       const response = await fetch(`${API_URL}/cart`,{
        method:"delete",
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

export async function updateCartProduct(prodId:string , updatedCount:number){
    const token = await getUserToken()
    try {
       const response = await fetch(`${API_URL}/cart/${prodId}`,{
        method:"put",
        body:JSON.stringify({count:updatedCount}),
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