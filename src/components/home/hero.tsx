"use client";
import { productI } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsServices";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Gem, MessageCirclePlus, ShieldCheck, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

export default function Hero() {

  const ref = useRef<HTMLDivElement>(null);
  const { data: sessionData } = useSession();
  const [products, setProducts] = useState<productI[] | []>([])

  async function getProducts() {
    const {data} = await getAllProducts()
    setProducts(data.data)
    console.log(products);
  }
  useEffect(() => {
    getProducts()
  }, [])

  
  

  useGSAP(
    () => {
      const split = new SplitText(".title", {
        type: "chars",
      });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        // stagger: 0.04,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(".paragraph", {
        opacity: 0,
        y: 40,
        delay: 0.6,
      });

      gsap.from(".btn", {
        opacity: 0,
        scale: 0.9,
        delay: 0.8,
        stagger: 0.4,
      });
    },
    { scope: ref },

  );

  return (
    <main ref={ref}>
      <div className="max-w-6xl mx-auto py-10 m-3" id="home">
        <div className=" mt-10 flex flex-col justify-center items-center flex-wrap gap-3">
          <h1 className="title md:text-5xl lg:text-7xl text-2xl accent-color font-semibold duration-500">
            Welcome {sessionData?.user?.name ?? "Guest"} to GoCart
          </h1>
          <p className="text-sm md:text-base text-center text-gray-700 paragraph">Our e-commerce platform is designed to give you a smooth, fast, and enjoyable shopping experience from the moment you land on the page. <br /> Browse a wide range of high-quality products, explore detailed
            categories, and enjoy a clean, modern interface built to save your time
          </p>
          <p className="text-xl paragraph">
            Everything You Love, One Click Away
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Link href="/products">
              <button className="btn bg-gray-800 text-xl text-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                Shop now !
              </button>
            </Link>
            {sessionData ? (
              <>
                <Link href="/allorders">
                  <button className="btn text-gray-800 text-xl bg-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                    Orders
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/register">
                  <button className="btn text-gray-800 text-xl bg-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                    Create account
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
            <div className="btn flex items-center gap-2 bg-blur p-2 text-gray-600 rounded-2xl shadow capitalize">
            <div>
              <Truck className="text-green-800 md:size-9"/>
            </div>
           <div className="flex flex-col">
             <span className="font-bold text-green-800">free shipping</span>
            <span>for all order above 400 EGP</span>
           </div>
          </div>
            <div className="btn flex items-center gap-2 bg-blur p-2 text-gray-600  rounded-2xl shadow capitalize">
            <div>
              <ShieldCheck className="text-blue-800 md:size-9"/>
            </div>
           <div className="flex flex-col">
             <span className="font-bold text-blue-800">secure payment</span>
            <span>all transactions are secured and encrypted </span>
           </div>
          </div>
            <div className="btn flex items-center gap-2 bg-blur p-2 text-gray-600  rounded-2xl shadow capitalize">
            <div>
             <MessageCirclePlus className="text-red-700 md:size-9" />
            </div>
           <div className="flex flex-col">
             <span className="font-bold text-red-700">customer care</span>
            <span>get support 24/7 via phone or email</span>
           </div>
          </div>
            <div className="btn flex items-center gap-2 bg-blur p-2 text-gray-600 rounded-2xl shadow capitalize">
            <div>
              <Gem className="text-violet-600 md:size-9" />
            </div>
           <div className="flex flex-col">
             <span className="font-bold text-violet-600">best prices</span>
            <span>we offer the best price for our products</span>
           </div>
          </div>

          </div>
          
        </div>
      </div>
    </main>
  );
}
