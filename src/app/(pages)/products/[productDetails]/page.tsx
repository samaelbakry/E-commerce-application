import AddToCart from "@/components/addToCart/addToCart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { productI } from "@/interfaces/products";
import { getSpecificProduct } from "@/services/productsServices";
import { Star } from "lucide-react";
import Image from "next/image";

interface productIdType {
  productDetails: string;
}

export default async function ProductId({ params }: { params: Promise<productIdType> }) {
  const { productDetails } = await params;
  const { data } = await getSpecificProduct(productDetails);
  const product: productI = data;

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen relative flex flex-col justify-between overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <header className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="border-b border-stone-200 pb-10">
          <Breadcrumb className="mb-3">
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
                  Details
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900 uppercase">
              {product.title}
            </h1>
            <span className="font-mono text-xs text-stone-400 whitespace-nowrap">
               #{product._id?.slice(-6)}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="relative bg-white border border-stone-200 rounded-xl p-8 flex items-center justify-center shadow-sm">
              <div className="w-full h-80 sm:h-96 flex items-center justify-center mix-blend-multiply">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  height={400}
                  width={400}
                  className="object-contain max-h-full w-auto"
                  priority
                />
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="border border-stone-200 rounded-xl p-3 bg-white hover:border-stone-400 transition-colors cursor-pointer"
                >
                  <Image src={img} alt="thumbnail" height={60} width={60} className="rounded object-contain mix-blend-multiply h-12 w-12" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 border-b border-stone-200/60 pb-3">
                <span className="text-emerald-700 font-medium">{product.subcategory?.[0]?.name || product.category?.name}</span>
                <span>{product.brand.name}</span>
              </div>

              <div className="space-y-2">
                <h5 className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  Description
                </h5>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-stone-200/60 pt-6">
                <div className="space-y-1">
                  <h5 className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                    Investment
                  </h5>
                  <span className="text-2xl font-bold text-stone-900 tracking-tight">
                    {product.price} <span className="text-xs font-normal text-stone-500 font-mono">EGP</span>
                  </span>
                </div>

                <div className="space-y-1 text-right">
                  <h5 className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                    Rating
                  </h5>
                  <div className="flex items-center gap-1 text-stone-900 justify-end">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-mono text-sm font-medium text-stone-600">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/60">
              <AddToCart prodId={product._id} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}