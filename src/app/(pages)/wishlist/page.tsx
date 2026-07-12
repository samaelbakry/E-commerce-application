"use client"
import { getUserWishlist } from "@/actions/wishlistAction";
import AddToCart from "@/components/addToCart/addToCart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { productI } from "@/interfaces/products";
import { wishlistI } from "@/interfaces/wishlist";
import { Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<productI[]>([]);

  async function getWishlist() {
    const data: wishlistI = await getUserWishlist();
    setWishlistProducts(data?.data ?? []);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen relative flex flex-col justify-between overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <header className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10">
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-stone-900 transition-colors">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-stone-900 font-medium">
                    Wishlist
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900">
              Curated <span className="font-serif italic text-emerald-600">Selection</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-md">
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Your personal library of exceptional objects. Reserved and prepared for assignment.
            </p>
            {wishlistProducts.length >= 1 && (
              <Link href="/cart" className="shrink-0">
                <button className="text-xs font-mono uppercase tracking-wider text-white bg-stone-950 px-4 py-2.5 rounded-none hover:bg-emerald-600 transition-colors duration-300">
                  View Shopping Cart
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 my-auto flex-1">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 max-w-sm mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
              Your collection is empty
            </span>
            <p className="text-sm text-stone-500 font-light">
              Explore our architectural spaces to find items worth pinning here.
            </p>
            <Link href="/products">
              <button className="text-xs font-mono uppercase tracking-wider text-white bg-stone-950 px-5 py-3 rounded-none hover:bg-emerald-600 transition-colors duration-300">
                Go Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlistProducts.map((prod, idx) => (
              <div key={prod._id} className="group flex flex-col justify-between h-full">
                <Card className="bg-transparent border-none p-0 shadow-none flex flex-col h-full rounded-none">
                  
                  <Link href={`/products/${prod._id}`} className="relative block overflow-hidden bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-md">
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300 group-hover:text-stone-400 transition-colors">
                      ITEM/{idx + 1}
                    </div>
                    
                    <div className="w-full h-44 flex items-center justify-center mix-blend-multiply transition-transform duration-300 group-hover:scale-102">
                      <Image
                        src={prod.imageCover}
                        width={300}
                        height={300}
                        alt={prod.title}
                        className="object-contain max-h-full w-auto p-2"
                        priority={idx < 4}
                      />
                    </div>
                  </Link>

                  <div className="pt-4 space-y-2 border-t border-stone-200/60 mt-3">
                    <div className="flex items-start justify-between gap-4">
                      <Link href={`/products/${prod._id}`} className="flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">
                          {prod.brand.name} — {prod.category.name}
                        </span>
                        <h5 className="text-sm font-bold text-stone-900 tracking-wide uppercase transition-colors duration-200 group-hover:text-emerald-600 line-clamp-1">
                          {prod.title}
                        </h5>
                      </Link>
                      <ArrowUpRight className="size-3.5 text-stone-300 shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-45 group-hover:text-stone-900" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const filledStar = index < Math.round(prod.ratingsAverage);
                          return (
                            <Star
                              key={index}
                              className={`size-3 ${filledStar ? "text-amber-500 fill-amber-500" : "text-stone-200"}`}
                            />
                          );
                        })}
                        <span className="text-[11px] font-mono text-stone-500 ml-1">
                          ({prod.ratingsAverage})
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium font-mono text-stone-900">
                        {prod.price.toLocaleString()} EGP
                      </p>
                    </div>

                    <div className="pt-2">
                      <AddToCart 
                        prodId={prod._id} 
                        wishlistPage 
                        wishlistProducts={wishlistProducts} 
                        setWishlistProducts={setWishlistProducts} 
                      />
                    </div>

                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}