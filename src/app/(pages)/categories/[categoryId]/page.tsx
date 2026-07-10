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
import { CategoryI } from "@/interfaces/categories";
import { productI } from "@/interfaces/products";
import { getSpecificCategory } from "@/services/categories";
import { getAllProducts } from "@/services/productsServices";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface catIdType {
  categoryId: string;
}

export default async function SpecificCategory({ params }: { params: Promise<catIdType> }) {
  const { categoryId } = await params;
  const specificCat: CategoryI = await getSpecificCategory(categoryId);
  const { data: allProducts }: { data: productI[] } = await getAllProducts();

  const productCategory = allProducts.filter(
    (prod) => prod.category?._id === categoryId,
  );

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
                  <BreadcrumbLink href="/categories" className="hover:text-stone-900 transition-colors">
                    Categories
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-stone-900 font-medium">
                    {specificCat?.name || "Department"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900 uppercase">
              {specificCat?.name || "Category Vault"}
            </h1>
          </div>

          <p className="max-w-xs text-sm text-stone-500 font-light leading-relaxed font-mono text-[11px] uppercase tracking-wider text-stone-400 md:text-right">
             Department Matrix ({productCategory.length})
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 my-auto">
        {productCategory.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-stone-200 rounded-2xl bg-white/40">
            <p className="text-sm font-light text-stone-400 font-mono uppercase tracking-widest">
              This category is currently empty — new items coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {productCategory.map((prod) => (
              <div key={prod._id} className="group flex flex-col justify-between h-full relative">
                <Card className="bg-transparent border-none p-0 shadow-none flex flex-col h-full rounded-none justify-between gap-4">
                  
                  <div className="space-y-4">
                    <Link href={`/products/${prod._id || prod.id}`} className="relative block overflow-hidden bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-md">
                      <div className="w-full h-64 flex items-center justify-center mix-blend-multiply transition-transform duration-300 group-hover:scale-102">
                        <Image
                          src={prod.imageCover || prod.images?.[0]}
                          width={300}
                          height={300}
                          alt={prod.title}
                          className="object-contain max-h-full w-auto p-2"
                        />
                      </div>
                    </Link>

                    <CardHeader className="p-0 space-y-2">
                      <div className="flex items-start justify-between gap-4 border-t border-stone-200/60 pt-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-medium">
                          {prod.brand?.name}
                        </span>
                        <div className="flex items-center gap-1 text-stone-600">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span className="font-mono text-[11px] font-medium">{prod.ratingsAverage}</span>
                        </div>
                      </div>

                      <Link href={`/products/${prod._id || prod.id}`} className="flex items-start justify-between gap-2 group/title">
                        <CardTitle className="text-base font-medium text-stone-900 tracking-tight line-clamp-1 group-hover/title:text-emerald-600 transition-colors">
                          {prod.title.split(" ", 3).join(" ")}
                        </CardTitle>
                        <ArrowUpRight className="size-4 text-stone-300 shrink-0 transition-transform duration-300 group-hover/title:rotate-45 group-hover/title:text-stone-900" />
                      </Link>

                      <CardDescription className="p-0 flex items-baseline justify-between pt-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                          Value
                        </span>
                        <span className="text-base font-bold text-stone-900 tracking-tight">
                          {prod.price} <span className="text-[10px] font-normal text-stone-500 font-mono">EGP</span>
                        </span>
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <div className="pt-2">
                    <AddToCart prodId={prod._id} />
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