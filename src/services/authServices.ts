import { forgetPassSchemaType, loginSchemaType, registerSchemaType, resetPassSchemaType } from "@/lib/authSchema/authSchema"
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signUp(values:registerSchemaType){
    try {
       const response = await fetch(`${API_URL}/auth/signup`,{
        method:"post",
        body: JSON.stringify(values),
        headers:{
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

export async function signInUser(values:loginSchemaType){
    try {
       const response = await fetch(`${API_URL}/auth/signin` , {
        method:"post",
        body: JSON.stringify(values),
        headers:{
            "content-Type":"application/json"
        }
       })
      const data = await response.json()
      return data   
    } catch (error) {
        console.log(error)
    }
}

export async function forgetPassword(values:forgetPassSchemaType){
    try {
       const response = await fetch(`${API_URL}/auth/forgotPasswords` , {
        method:"post",
        body: JSON.stringify(values),
        headers:{
            "content-Type":"application/json"
        }
       })
      const data = await response.json()
      return data   
    } catch (error) {
        console.log(error)
    }
}

export interface verifyCodeI{
    resetCode:string
}

export async function verifyResetCode(value:verifyCodeI){
    try {
       const response = await fetch(`${API_URL}/auth/verifyResetCode` , {
        method:"post",
        body: JSON.stringify(value),
        headers:{
            "content-Type":"application/json"
        }
       })
      const data = await response.json()
      return data   
    } catch (error) {
        console.log(error)
    }
}

export async function resetPassword(value:resetPassSchemaType){
    try {
       const response = await fetch(`${API_URL}/auth/resetPassword` , {
        method:"put",
        body: JSON.stringify(value),
        headers:{
            "content-Type":"application/json"
        }
       })
      const data = await response.json()
      return data   
    } catch (error) {
        console.log(error)
    }
}