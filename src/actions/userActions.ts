"use server"
import { getUserToken } from "@/lib/auth";
import { updateUserDataPasswordSchemaType, updateUserDataSchemaType } from "@/lib/userDataSchema/userDataSchema";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateUserData(values:updateUserDataSchemaType){
    const token = await getUserToken()
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/users/updateMe`,{
        method:"put",
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

export async function updateUserPassword(values:updateUserDataPasswordSchemaType){
    const token = await getUserToken()
    console.log(token);
    try {
       const response = await fetch(`${API_URL}/users/changeMyPassword`,{
        method:"put",
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