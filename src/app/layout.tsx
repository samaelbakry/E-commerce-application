import AuthProvider from "@/providers/authProvider";
import CartDataProvider from "@/providers/cartDataProvider";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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
      <body className={DosisSans.className}>
        <AuthProvider>
          <CartDataProvider>
            {children}
            <Toaster richColors position="top-center" />
          </CartDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
