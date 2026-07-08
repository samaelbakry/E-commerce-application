import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { productI } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsServices";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import AddToCart from "@/components/addToCart/addToCart";
import React from "react";

const THEME = {
  "--paper": "#FFFEF8",
  "--ink": "#1C1B17",
  "--mustard": "#E8A33D",
  "--mustard-ink": "#B9781F",
} as React.CSSProperties;

export default async function Products() {
  const data = await getAllProducts();
  const products: productI[] = data?.data ?? [];

  return (
    <div style={THEME} className="bg-[var(--paper)] min-h-screen">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 28px)",
        }}
      />

      <header>
        <div className="max-w-7xl mx-auto p-3">
          <div className="relative flex flex-col gap-2 items-start p-4 bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl">
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />

            <h1 className="text-xl font-black text-[var(--ink)]">
              Everything You Love, One Click Away
            </h1>
            <Breadcrumb className="mt-1">
              <BreadcrumbList className="font-mono text-xs uppercase tracking-wider">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[var(--mustard-ink)]">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[var(--ink)]/60">
                    products
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mb-10 mt-5 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div key={prod._id}>
            <Card className="relative bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer pt-0 overflow-visible">
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/20 bg-[var(--paper)] z-10" />

              <Link href={`/products/${prod.id}`}>
                <div className="relative pt-3">
                  <span className="absolute top-2 right-2 rotate-[-6deg] bg-[var(--mustard)] text-[var(--ink)] font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-sm border border-dashed border-[var(--ink)]/25 z-10">
                    {prod.price} EGP
                  </span>
                  <Image
                    src={prod.imageCover}
                    width={300}
                    height={300}
                    alt="product-cover-image"
                    className="relative object-contain rounded-lg p-2 w-full h-64 md:h-72 mx-auto"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-[var(--ink)]">
                    <span className="truncate">{prod.title.split(" ", 3).join(" ")}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50 border border-dashed border-[var(--ink)]/20 rounded-full px-2 py-0.5">
                      {prod.brand.name}
                    </span>
                  </CardTitle>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink)]/40">
                    {prod.category.name}
                  </span>
                  <CardDescription className="flex justify-between items-center pt-1">
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStar = star < Math.round(prod.ratingsAverage);
                        return (
                          <React.Fragment key={index}>
                            <Star
                              className={`size-4 ${
                                filledStar
                                  ? "text-[var(--mustard-ink)] fill-[var(--mustard-ink)]"
                                  : "text-[var(--ink)]/20"
                              }`}
                            />
                          </React.Fragment>
                        );
                      })}
                      <span className="font-mono text-xs text-[var(--ink)]/60">
                        {prod.ratingsAverage}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Link>

              <div className="border-t border-dashed border-[var(--ink)]/15 mx-6" />
              <div className="px-6 pb-4 pt-3">
                <AddToCart prodId={prod._id} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
