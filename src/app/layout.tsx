import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/authProvider";
import CartDataProvider from "@/providers/cartDataProvider";

const DosisSans = Dosis({
  variable: "--font-Dosis-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "GOCART",
  description: "GOCART is a modern e-commerce platform built with Next.js and TypeScript, offering a seamless shopping experience, secure authentication, and fast checkout",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className={`${DosisSans.className} antialiased`} >
       <AuthProvider>
         <CartDataProvider>
          <Navbar/>
           <main className="min-h-[calc(100vh-240px)]">
            {children}
            <Toaster richColors position="top-center"/>
            </main>
            <Footer/>
         </CartDataProvider>
       </AuthProvider>
      </body>
    </html>
  );
}
