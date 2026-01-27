"use client"
import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import Link from "next/link";

gsap.registerPlugin(SplitText );

export default function Home() {
  useGSAP(()=>{
    const homeText = new SplitText( ".title" , {type:"chars,words"})

    gsap.fromTo(homeText.chars , {
      yPercent:100,
      opacity:0,
      ease:"expo.out"
    },{yPercent:0 , opacity:1 , duration:1})

    gsap.fromTo(".paragraph" , {
      yPercent:100,
      opacity:0,
      ease:"expo.out"
    },{yPercent:0 , opacity:1 , duration:0.5 , delay:0.7})

    gsap.fromTo(".btn" , {
      opacity:0,
      ease:"expo.inOut"
    },{yPercent:0 , opacity:1 , duration:0.9 , delay:0.7})

   
  },[])

  return (
    <>
      <main>
        <div className="max-w-6xl mx-auto py-10 m-3" id="home">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="title md:text-6xl lg:text-8xl text-5xl max-w-fit accent-color font-semibold duration-500">
              welcome to GoCart
            </h1>
            <p className="text-xl text-gray-700 paragraph">Everything You Love, One Click Away</p>
            <div className="flex items-center gap-2 mt-4">
             <Link href="/products">
              <button className="btn bg-gray-800 text-xl text-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                Shop now !
              </button>
             </Link>
              <button className="btn text-gray-800 text-xl bg-white px-4 py-1 rounded-2xl shadow cursor-pointer">
                Create account
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
