import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const decodedToken = (await cookies()).get("next-auth.session-token")?.value
    const allUserData = await decode({token:decodedToken , secret:process.env.AUTH_SECRET!})
    
    return allUserData?.token
}
