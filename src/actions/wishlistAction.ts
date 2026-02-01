"use server"
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addToProductToWishlist(productId:string) {
    const token = await getUserToken()
     if(!token){
        throw new Error("You must have account to do this action")
    }
    const response = await fetch(`${API_URL}/wishlist` ,{
        method:"post",
        body:JSON.stringify({productId}),
        headers:{
            token,
            "content-type":"application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function getUserWishlist() {
    const token = await getUserToken()
     if(!token){
        throw new Error("You must have account to do this action")
    }
    const response = await fetch(`${API_URL}/wishlist` ,{
        headers:{
            token,
            "content-type":"application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function deleteProductFromWishlist(productId:string) {
    const token = await getUserToken()
     if(!token){
        throw new Error("You must have account to do this action")
    }
    const response = await fetch(`${API_URL}/wishlist/${productId}` ,{
        method:"delete",
        body:JSON.stringify({productId}),
        headers:{
            token,
            "content-type":"application/json"
        }
    })
    const data = await response.json()
    return data
}