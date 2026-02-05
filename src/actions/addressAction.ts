"use server"
import { addressSchemaType } from "@/lib/addressSchema/addressSchema";
import { getUserToken } from "@/lib/auth";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addUserAddress(values:addressSchemaType){
    const token = await getUserToken()
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/addresses`,{
        method:"post",
        body: JSON.stringify(values),
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

export async function getUserAddress(){
    const token = await getUserToken()
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/addresses`,
         {
        cache:"force-cache",
        headers:{
            token,
            "Content-Type":"application/json"
        }
        ,
       }
       )
       const data = await response.json()
       return data    
    } catch (error) {
        console.log(error)
    }
}


export async function removeUserAddress(id:string){
    const token = await getUserToken()
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/addresses/${id}`,
         {
        method:"delete",
        headers:{
            token,
            "Content-Type":"application/json"
        }
        ,
       }
       )
       const data = await response.json()
       return data    
    } catch (error) {
        console.log(error)
    }
}