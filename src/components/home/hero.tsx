"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Gem, MessageCirclePlus, ShieldCheck, Truck, ArrowRight, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useRef } from "react";

gsap.registerPlugin(SplitText);

// Torn-paper edge for the receipt card (top + bottom zigzag)
function tornClipPath(teeth = 16, depth = 3) {
  const pts: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * 100;
    const y = i % 2 === 0 ? 0 : depth;
    pts.push(`${x}% ${y}%`);
  }
  for (let i = teeth; i >= 0; i--) {
    const x = (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 100 - depth;
    pts.push(`${x}% ${y}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

const BARCODE = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 4, 2, 1, 3, 2, 1, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2, 1, 4];

const PERKS = [
  {
    icon: Truck,
    label: "Free shipping",
    desc: "orders over 400 EGP",
    tag: "FREE",
    color: "var(--forest)",
  },
  {
    icon: ShieldCheck,
    label: "Secure payment",
    desc: "bank-level encryption",
    tag: "SAFE",
    color: "var(--ink)",
  },
  {
    icon: MessageCirclePlus,
    label: "Customer care",
    desc: "live support, day & night",
    tag: "24/7",
    color: "var(--red)",
  },
  {
    icon: Gem,
    label: "Best prices",
    desc: "matched, every time",
    tag: "LOW",
    color: "var(--mustard-ink)",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: sessionData } = useSession();
  const receiptClip = useMemo(() => tornClipPath(16, 3), []);

  useGSAP(
    () => {
      const split = new SplitText(".title-text", { type: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".tag-badge", {
        opacity: 0,
        scale: 1.5,
        rotate: -8,
        duration: 0.5,
        ease: "back.out(2.5)",
      })
        .from(
          split.chars,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.02,
          },
          "-=0.2",
        )
        .from(
          ".fade-left",
          {
            opacity: 0,
            x: -24,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".receipt-card",
          {
            opacity: 0,
            scaleY: 0.85,
            transformOrigin: "top center",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .from(
          ".receipt-line",
          {
            opacity: 0,
            x: 14,
            duration: 0.45,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          ".receipt-stamp",
          {
            opacity: 0,
            scale: 0.6,
            rotate: -25,
            duration: 0.5,
            ease: "back.out(3)",
          },
          "-=0.3",
        )
        .from(
          ".receipt-barcode",
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.1",
        );
    },
    { scope: ref },
  );

  return (
    <main
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center bg-[var(--paper)] overflow-hidden"
      style={
        {
          "--paper": "#FFFEF8",
          "--ink": "#1C1B17",
          "--mustard": "#E8A33D",
          "--mustard-ink": "#B9781F",
          "--forest": "#2B5D3A",
          "--red": "#C1443C",
          "--line": "#D9D2C2",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div className="absolute -top-6 -right-10 flex items-end gap-[3px] opacity-[0.06] rotate-6 pointer-events-none">
        {BARCODE.map((w, i) => (
          <div key={i} style={{ width: `${w * 4}px`, height: "180px", background: "var(--ink)" }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 w-full relative" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            <div className="tag-badge relative inline-flex items-center gap-2 pl-6 pr-4 py-1.5 bg-[var(--mustard)]/15 border border-dashed border-[var(--mustard-ink)]/60 rounded-r-full rounded-l-sm text-xs font-bold text-[var(--mustard-ink)] uppercase tracking-wider font-mono">
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--paper)] ring-1 ring-[var(--ink)]/40" />
              <span className="w-1.5 h-1.5 bg-[var(--mustard-ink)] rounded-full animate-pulse" />
              Fresh stock, daily drops
            </div>

            <h1 className="overflow-hidden py-1 text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] tracking-tight leading-[1.1]">
              <span className="title-text block">Welcome to GoCart,</span>
              <span className="title-text block text-[var(--forest)]">
                {sessionData?.user?.name ?? "Guest"}
              </span>
            </h1>

            <p className="fade-left max-w-xl text-base sm:text-lg text-[var(--ink)]/70 leading-relaxed font-normal">
              Our e-commerce platform is designed to give you a smooth, fast, and
              enjoyable shopping experience. Browse thousands of high-quality products across premium categories tailored to you.
            </p>

            <div className="fade-left flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto bg-[var(--ink)] hover:bg-[var(--forest)] text-[var(--paper)] text-base font-semibold pl-9 pr-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--paper)]" />
                  Shop Now
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {sessionData ? (
                <Link href="/allorders" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-transparent hover:bg-[var(--ink)]/5 text-[var(--ink)] border-2 border-dashed border-[var(--ink)]/30 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer">
                    View Orders
                  </button>
                </Link>
              ) : (
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-transparent hover:bg-[var(--ink)]/5 text-[var(--ink)] border-2 border-dashed border-[var(--ink)]/30 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer">
                    Create Account
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center">
            <div
              className="receipt-card relative w-full max-w-sm bg-white pt-8 pb-10 px-7 filter drop-shadow-xl"
              style={{ clipPath: receiptClip }}
            >
              <div className="receipt-stamp absolute -top-3 -right-3 sm:right-2 flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-[var(--red)]/70 text-[var(--red)] rotate-[-14deg] font-mono text-[10px] font-bold uppercase tracking-widest text-center leading-tight">
                Trusted
                <br />
                Checkout
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono font-bold text-sm tracking-widest uppercase text-[var(--ink)]">
                  GoCart
                </span>
                <span className="font-mono text-[11px] text-[var(--ink)]/50">No. 00429</span>
              </div>
              <div className="font-mono text-[11px] text-[var(--ink)]/50 mb-4">
                Perks included with every order
              </div>

              <div className="border-t-2 border-dashed border-[var(--line)] mb-3" />

              <div className="grid grid-cols-[1fr_auto] gap-x-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]/40 mb-2">
                <span>Benefit</span>
                <span>Status</span>
              </div>

              <div className="flex flex-col">
                {PERKS.map((perk, i) => (
                  <div key={perk.label}>
                    <div className="receipt-line flex items-center justify-between gap-3 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
                          style={{ background: `${perk.color}1A`, color: perk.color }}
                        >
                          <perk.icon className="size-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-mono font-bold text-xs uppercase tracking-wide text-[var(--ink)] truncate">
                            {perk.label}
                          </span>
                          <span className="font-mono text-[11px] text-[var(--ink)]/50 truncate">
                            {perk.desc}
                          </span>
                        </div>
                      </div>
                      <span
                        className="shrink-0 inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-1 rounded-full"
                        style={{ background: `${perk.color}1A`, color: perk.color }}
                      >
                        <Check className="size-3" />
                        {perk.tag}
                      </span>
                    </div>
                    {i < PERKS.length - 1 && (
                      <div className="border-t border-dashed border-[var(--line)]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-[var(--line)] mt-2 mb-4" />

              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)] mb-5">
                <span>Total value</span>
                <span className="text-[var(--forest)]">All included</span>
              </div>

              <div className="receipt-barcode flex items-end gap-[2px] justify-center">
                {BARCODE.map((w, i) => (
                  <div
                    key={i}
                    style={{ width: `${w}px`, height: "36px", background: "var(--ink)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
