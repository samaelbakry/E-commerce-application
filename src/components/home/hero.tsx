"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: sessionData } = useSession();

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
        stagger: 0.1,
      });
    },
    { scope: ref }
  );

  return (
  
     <main ref={ref}>
       <div className="max-w-6xl mx-auto py-10 m-3" id="home">
          <div className="flex flex-col justify-center items-center gap-2">
           <h1 className="title md:text-6xl lg:text-7xl text-4xl max-w-fit accent-color font-semibold duration-500">
             welcome {sessionData?.user?.name ?? "Guest"} to GoCart
          </h1>
           <p className="text-xl text-gray-700 paragraph">Everything You Love, One Click Away</p>
            <div className="flex items-center gap-2 mt-4">
                <Link href="/products">
            <button className="btn bg-gray-800 text-xl text-white px-4 py-1 rounded-2xl shadow cursor-pointer">
               Shop now !
            </button>
           </Link>
          {sessionData ? <>
            <Link href="/orders">
            <button className="btn text-gray-800 text-xl bg-white px-4 py-1 rounded-2xl shadow cursor-pointer">
              Orders
            </button>
           </Link>
          </> : <>
          <Link href='/register'>
              <button className="btn text-gray-800 text-xl bg-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                Create account
              </button>
             </Link>
          </>}

             
           </div>
           </div>
        </div>
       </main>
  );
}
