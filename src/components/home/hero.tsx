"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Gem, MessageCirclePlus, ShieldCheck, Truck, ArrowUpRight, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const PERKS = [
  {
    icon: Truck,
    label: "Free Shipping",
    desc: "Above 400 EGP",
    bgClass: "bg-stone-100",
    textClass: "text-stone-800",
  },
  {
    icon: ShieldCheck,
    label: "Secured Payments",
    desc: "Fully encrypted",
    bgClass: "bg-stone-100",
    textClass: "text-stone-800",
  },
  {
    icon: MessageCirclePlus,
    label: "Concierge Care",
    desc: "Premium human support",
    bgClass: "bg-stone-100",
    textClass: "text-stone-800",
  },
  {
    icon: Gem,
    label: "Price Guarantee",
    desc: "Matched value always",
    bgClass: "bg-stone-100",
    textClass: "text-stone-800",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: sessionData } = useSession();

  useGSAP(
    () => {
      const split = new SplitText(".title-text", { type: "words,chars" });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          split.chars,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.015,
          },
          "-=0.4"
        )
        .from(
          ".fade-in-element",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .from(
          ".perk-card",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.05,
          },
          "-=0.4"
        );

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <main
      ref={ref}
      className="relative min-h-[95vh] flex flex-col justify-between bg-stone-50 overflow-hidden pt-20 pb-12"
    >
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 my-auto">
        <div className="flex flex-col gap-10 max-w-5xl">
          
          <div className="hero-badge inline-flex items-center gap-2 self-start px-3 py-1 bg-white border border-stone-200 rounded-full shadow-sm text-[10px] font-bold tracking-widest uppercase text-stone-600">
            <Star className="size-3 fill-emerald-600 text-emerald-600 animate-pulse" />
            <span>The New Era of E-Commerce</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-stone-900 leading-[1.08]">
            <span className="title-text block font-extralight text-stone-400">Welcome to GoCart,</span>
            <span className="title-text block font-normal">Elevated shopping for</span>
            <span className="title-text block text-emerald-600 font-serif italic font-normal tracking-normal">
              {sessionData?.user?.name ?? "the modern explorer."}
            </span>
          </h1>

          <div className="fade-in-element flex flex-col md:flex-row md:items-end gap-8 justify-between mt-4">
            <p className="max-w-md text-base sm:text-lg text-stone-600 leading-relaxed font-light">
              Discover thousands of authentic goods across premium curated categories, built with absolute structural clarity and concierge fulfillment.
            </p>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link href="/products">
                <button className="group relative bg-stone-900 hover:bg-emerald-600 text-white text-sm font-medium px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-3 cursor-pointer">
                  <span>Browse Collection</span>
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="size-3 text-white" />
                  </div>
                </button>
              </Link>

              {!sessionData && (
                <Link href="/register">
                  <button className="bg-transparent hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-medium px-8 py-4 rounded-full transition-all duration-200 cursor-pointer">
                    Create Account
                  </button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full mt-16 relative z-10">
        <div className="border-t border-stone-200 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk, idx) => (
              <div
                key={perk.label}
                className="perk-card group bg-white border border-stone-200/80 p-5 rounded-xl transition-all duration-300 hover:border-stone-400 hover:shadow-md flex flex-col justify-between gap-6"
              >
                <div className="flex items-start justify-between w-full">
                  <div className={`w-10 h-10 rounded-lg ${perk.bgClass} ${perk.textClass} flex items-center justify-center`}>
                    <perk.icon className="size-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono text-stone-300 group-hover:text-stone-400 transition-colors">
                    0{idx + 1} 
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-stone-900 tracking-wide uppercase mb-1">
                    {perk.label}
                  </h3>
                  <p className="text-xs text-stone-500 font-light">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}