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
import Image from "next/image";
import { Star } from "lucide-react";
import AddToCart from "@/components/addToCart/addToCart";

interface productIdType {
  productDetails: string;
}

const THEME = {
  "--paper": "#FFFEF8",
  "--ink": "#1C1B17",
  "--mustard": "#E8A33D",
  "--mustard-ink": "#B9781F",
  "--forest": "#2B5D3A",
} as React.CSSProperties;

export default async function ProductId({ params }: { params: Promise<productIdType> }) {
  const { productDetails } = await params;
  const { data } = await getSpecificProduct(productDetails);
  const product: productI = data;

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
          <div className="relative p-4 bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl">
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />
            <Breadcrumb>
              <BreadcrumbList className="font-mono text-xs uppercase tracking-wider">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[var(--mustard-ink)]">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products" className="text-[var(--mustard-ink)]">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[var(--ink)]/60">
                    Product Details
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto my-4 px-3 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="relative bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl p-4 flex items-center justify-center">
              <Image
                src={product.images[0]}
                alt="prod.details.img"
                height={200}
                width={200}
                className="rounded-lg object-cover w-full h-auto"
              />
              <span className="absolute -top-3 -right-3 rotate-[10deg] flex flex-col items-center justify-center w-16 h-16 rounded-full bg-[var(--mustard)] border border-dashed border-[var(--ink)]/25 shadow-sm font-mono font-bold text-[var(--ink)]">
                <Star className="size-3.5 fill-[var(--ink)] text-[var(--ink)]" />
                <span className="text-xs">{product.ratingsAverage}</span>
              </span>
            </div>

           
          </div>

          <div className="bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl p-6">
            <div className="flex items-baseline justify-between mb-3">
              <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                Product Details
              </h5>
              <span className="font-mono text-[11px] text-[var(--ink)]/40">
                #{product._id?.slice(-6)}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-[var(--ink)]/15 mb-1" />

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 py-3 border-b border-dashed border-[var(--ink)]/15">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink)]/50">
                  Name
                </span>
                <span className="text-sm font-semibold text-[var(--ink)] text-right">
                  {product.title}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3 border-b border-dashed border-[var(--ink)]/15">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink)]/50">
                  Category
                </span>
                <span className="text-sm text-[var(--ink)]/80 text-right">
                  {product.subcategory[0].name}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3 border-b border-dashed border-[var(--ink)]/15">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink)]/50">
                  Brand
                </span>
                <span className="text-sm text-[var(--ink)]/80 text-right">
                  {product.brand.name}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 py-3 border-b border-dashed border-[var(--ink)]/15">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink)]/50">
                  Description
                </span>
                <span className="text-sm text-[var(--ink)]/70 leading-relaxed">
                  {product.description}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink)]">
                Price
              </span>
              <span className="text-2xl font-black text-[var(--forest)]">
                {product.price} <span className="text-sm font-bold">EGP</span>
              </span>
            </div>

            <div className="border-t-2 border-dashed border-[var(--ink)]/15 mb-4" />

            <AddToCart prodId={product._id} />
             <div className="flex items-center flex-wrap gap-3 mt-6 mx-auto">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="border border-dashed border-[var(--ink)]/15 rounded-lg p-1.5 bg-[var(--paper)] hover:border-[var(--mustard-ink)]/60 transition-colors"
                >
                  <Image src={img} alt="prod.details.img" height={72} width={72} className="rounded-md object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
