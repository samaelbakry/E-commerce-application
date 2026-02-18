// import { decode, getToken } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { NextRequest } from "next/server";

// export async function getUserToken() {
//     const decodedToken = (await cookies()).get("next-auth.session-token")?.value 
//     const allUserData = await decode({token:decodedToken , secret:process.env.AUTH_SECRET!})

//     //  const allUserData = await getToken({
//     //     req:{cookies :await cookies()} as unknown as NextRequest,
//     //     secret:process.env.AUTH_SECRET
//     //  })

    


//     return allUserData?.token as string
// }

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const myCookies = await cookies()
    const decodedToken = myCookies.get("next-auth.session-token")?.value || myCookies.get("__Secure-next-auth.session-token")?.value 
    const token = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })
    console.log(token?.token);

    return token?.token as string
}