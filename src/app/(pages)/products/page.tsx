import AddToCart from "@/components/addToCart/addToCart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productI } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsServices";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Products() {
  const data = await getAllProducts();
  const products: productI[] = data?.data ?? [];

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
                    Products
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900">
              Curated <span className="font-serif italic text-emerald-600">Collection</span>
            </h1>
          </div>

          <p className="max-w-xs text-sm text-stone-500 font-light leading-relaxed">
            A precise selection of thousands of authentic essentials designed to streamline your daily flow.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((prod, idx) => (
            <div key={prod._id} className="group flex flex-col justify-between h-full">
              <Card className="bg-transparent border-none p-0 shadow-none flex flex-col h-full rounded-none">
                
                <Link href={`/products/${prod.id}`} className="relative block overflow-hidden bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-md">
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300 group-hover:text-stone-400 transition-colors">
                    0{idx + 1} 
                  </div>
                  
                  <div className="w-full h-52 flex items-center justify-center mix-blend-multiply transition-transform duration-300 group-hover:scale-102">
                    <Image
                      src={prod.imageCover}
                      width={250}
                      height={250}
                      alt={prod.title}
                      className="object-contain max-h-full w-auto"
                    />
                  </div>
                </Link>

                <CardHeader className="p-0 pt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                      <span className="text-emerald-700 font-medium">{prod.category.name}</span>
                      <span>{prod.brand.name}</span>
                    </div>

                    <Link href={`/products/${prod.id}`} className="group/title flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-bold text-stone-900 tracking-wide uppercase line-clamp-2 transition-colors duration-200 group-hover/title:text-emerald-600">
                        {prod.title.split(" ", 4).join(" ")}
                      </CardTitle>
                      <ArrowUpRight className="size-3.5 text-stone-300 shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-45 group-hover:text-stone-900" />
                    </Link>
                  </div>

                  <CardDescription className="flex items-center justify-between mt-4 pt-3 border-t border-stone-200/60">
                    <span className="text-sm font-bold text-stone-900">
                      {prod.price} <span className="text-[10px] font-normal text-stone-500 font-mono">EGP</span>
                    </span>

                    <div className="flex items-center gap-0.5 text-stone-900">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="font-mono text-xs font-medium text-stone-600 ml-1">
                        {prod.ratingsAverage}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="pt-3">
                <AddToCart prodId={prod._id} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}