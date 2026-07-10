import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { BrandI } from "@/interfaces/brands";
import { getAllBrands } from "@/services/brandsServices";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default async function Brands() {
  const data = await getAllBrands();
  const brands: BrandI[] = (await data?.data) ?? [];

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
                  <BreadcrumbLink href="/products" className="hover:text-stone-900 transition-colors">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-stone-900 font-medium">
                    Brands
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900">
              Houses of <span className="font-serif italic text-emerald-600">Design</span>
            </h1>
          </div>

          <p className="max-w-xs text-sm text-stone-500 font-light leading-relaxed">
            Discover global and local houses shaping contemporary aesthetics, architecture, and craftsmanship.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {brands.map((brand, idx) => (
            <div key={brand._id} className="group flex flex-col justify-between h-full">
              <Card className="bg-transparent border-none p-0 shadow-none flex flex-col h-full rounded-none">
                
                <Link href={`/brands/${brand._id}`} className="relative block overflow-hidden bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-md">
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300 group-hover:text-stone-400 transition-colors">
                    B/{idx + 1}
                  </div>
                  
                  <div className="w-full h-44 flex items-center justify-center mix-blend-multiply transition-transform duration-300 group-hover:scale-102">
                    <Image
                      src={brand.image}
                      width={300}
                      height={300}
                      alt={brand.name}
                      className="object-contain max-h-full w-auto p-2"
                    />
                  </div>
                </Link>

                <div className="pt-4 flex items-start justify-between gap-4 border-t border-stone-200/60 mt-3">
                  <Link href={`/brands/${brand._id}`} className="flex-1">
                    <h5 className="text-sm font-bold text-stone-900 tracking-wide uppercase transition-colors duration-200 group-hover:text-emerald-600 line-clamp-1">
                      {brand.name}
                    </h5>
                  </Link>
                  <ArrowUpRight className="size-3.5 text-stone-300 shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-45 group-hover:text-stone-900" />
                </div>

              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}