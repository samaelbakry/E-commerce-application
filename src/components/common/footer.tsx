"use client";

import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const COLUMNS = [
  {
    title: "Shop Collection",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Exclusive Offers", href: "/offers" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Contact Concierge", href: "/contact" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Shipping & Return Policies", href: "/shipping" },
    ],
  },
  {
    title: "Your Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
      { label: "Track My Orders", href: "/orders" },
    ],
  },
  {
    title: "Company About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Privacy Blueprint", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-[var(--bg-footer)] pt-16 pb-12 text-[var(--ink-muted)] border-t border-[var(--border-clean)]"
      style={
        {
          "--bg-footer": "#FAFAF9",    
          "---ink-dark": "#18181B",    
          "--ink-muted": "#52525B",    
          "--border-clean": "#E4E4E7",  
          "--brand-success": "#059669",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-10 border-b border-[var(--border-clean)]">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[var(---ink-dark)] flex items-center justify-center text-white transition-colors group-hover:bg-[var(--brand-success)] duration-300">
              <MdOutlineShoppingCart className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(---ink-dark)]">
              GOCART
            </span>
          </Link>
          <span className="text-xs font-medium tracking-wide text-[var(--ink-muted)] opacity-80 sm:text-right">
            Curated convenience delivered worldwide.
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 py-12">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(---ink-dark)]">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-sm text-[var(--ink-muted)] hover:text-[var(---ink-dark)] transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--brand-success)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(---ink-dark)]">
              Direct Contact
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-[var(--ink-muted)]">
              <li className="hover:text-[var(---ink-dark)] transition-colors duration-200 cursor-pointer">
                support@gocart.com
              </li>
              <li className="font-medium text-[var(---ink-dark)]">
                +20 100 000 0000
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-clean)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div className="flex flex-wrap items-center gap-2 order-2 md:order-1">
            {["Visa", "Mastercard", "Cash on Delivery"].map((method) => (
              <span
                key={method}
                className="text-[11px] font-medium text-[var(--ink-muted)] bg-white border border-[var(--border-clean)] rounded-md px-3 py-1 shadow-sm"
              >
                {method}
              </span>
            ))}
          </div>

          <span className="text-xs text-[var(--ink-muted)] opacity-70 order-1 md:order-2">
            © 2026 GoCart Ltd. All processing protected under premium merchant guidelines.
          </span>
          
        </div>
      </div>
    </footer>
  );
}