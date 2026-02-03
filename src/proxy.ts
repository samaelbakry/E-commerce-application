import next from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request:NextRequest) {

    const token = await getToken({ req:request })
    const {pathname} = request.nextUrl

    const authPages = pathname ==="/login" || pathname ==="/register" || pathname ==="/forgetPassword" || pathname ==="/resetPassword" || pathname ==="/verifyRestPassword"
   

    if(token && authPages){
       return NextResponse.redirect(new URL("/" , request.url))
    }
    if(!token && !authPages){
       return NextResponse.redirect(new URL("/login" , request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher:["/brands", "/categories" , "/login" , "/register", "/forgetPassword" , "/resetPassword" , "/verifyRestPassword"]
}