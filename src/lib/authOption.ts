import { signInUser } from "@/services/authServices";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface decodedTokenType {
  id: string;
  name: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error:"/login"
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const data = await signInUser(credentials);
        if (data.message === "success") {
          const decodedToken: decodedTokenType = jwtDecode(data.token);
          return {
            id: decodedToken.id,
            token: data.token,
            user: data.user,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
       return token;
    },
    session({session , token}){
        if(token){
            session.user=token.user
        }
        return session
    }
  },
};
