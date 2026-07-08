import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

function tornTopClipPath(teeth = 20, depth = 6) {
  const pts: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * 100;
    const y = i % 2 === 0 ? 0 : depth;
    pts.push(`${x}% ${y}%`);
  }
  pts.push("100% 100%", "0% 100%");
  return `polygon(${pts.join(", ")})`;
}

const BARCODE = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 4, 2, 1, 3, 2, 1, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2];

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Orders", href: "/orders" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About GoCart", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {

  return (
    <footer
      className="relative bg-[var(--ink)] pt-14 pb-10 text-[var(--paper)]/80"
      style={
        {
          "--paper": "#FFFEF8",
          "--ink": "#1C1B17",
          "--mustard": "#E8A33D",
          "--line": "#4A473E",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <Link href="/" className="flex items-center gap-2">
            <MdOutlineShoppingCart className="size-6 text-[var(--mustard)]" />
            <span className="text-2xl font-black tracking-tight text-[var(--paper)]">
              GOCART
            </span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--paper)]/40">
            Thank you for shopping with us
          </span>
        </div>

        <div className="border-t-2 border-dashed border-[var(--line)] mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--mustard)]">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-baseline gap-2 text-sm text-[var(--paper)]/70 hover:text-[var(--paper)] transition-colors"
                    >
                      <span className="shrink-0">{link.label}</span>
                      <span className="flex-1 border-b border-dotted border-[var(--paper)]/20 group-hover:border-[var(--mustard)]/50 translate-y-[-3px]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--mustard)]">
              Contact
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-[var(--paper)]/70 font-mono">
              <li>support@gocart.com</li>
              <li>+20 100 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-[var(--line)] my-10" />

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {["Visa", "Mastercard", "Cash on Delivery"].map((method) => (
            <span
              key={method}
              className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--paper)]/60 border border-dashed border-[var(--paper)]/25 rounded-md px-3 py-1.5"
            >
              {method}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <span className="font-mono text-xs text-[var(--paper)]/40 order-2 sm:order-1">
            © 2026 GoCart™. All rights reserved.
          </span>
          <div className="flex items-end gap-[2px] order-1 sm:order-2">
            {BARCODE.map((w, i) => (
              <div
                key={i}
                style={{ width: `${w}px`, height: "28px", background: "var(--paper)", opacity: 0.6 }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
