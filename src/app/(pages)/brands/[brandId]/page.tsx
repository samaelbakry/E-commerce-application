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
import { BrandI } from "@/interfaces/brands";
import { productI } from "@/interfaces/products";
import { getSpecificBrand } from "@/services/brandsServices";
import { getAllProducts } from "@/services/productsServices";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface brandIdType {
  brandId: string;
}

export default async function BrandId({params}: { params: Promise<brandIdType>;}) {
  const { brandId } = await params;

  const { data }: { data: BrandI } = await getSpecificBrand(brandId);
  const { data: allProducts }: { data: productI[] } = await getAllProducts();
  
  const productBrand = allProducts.filter(
    (prod) => prod.brand?._id === brandId,
  );

  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto p-3 my-3 bg-blur flex justify-between">
          <div className="flex flex-col gap-2 items-start m-2">
            <Breadcrumb className="mt-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="accent-color">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products" className="accent-color">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/brands" className="accent-color">
                    Brands
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Specific Brand</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto bg-blur my-4 P-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
        {productBrand.length === 0 ? (
          <>
            <div className="col-span-full text-center py-5 text-lg font-semibold">
              This brand is currently empty — new items coming soon.
            </div>
          </>
        ) : (
          <>
            {productBrand.map((prod) => (
              <div key={prod._id} className="col-span-1 mx-auto pt-2 relative">
                <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 md:h-140 h-120 hover:scale-105 duration-500 cursor-pointer w-100">
                  <Link href={`/products/${prod.id}`}>
                    <div className="relative" />
                    <Image
                      src={prod.imageCover}
                      width={300}
                      height={300}
                      alt="product-cover-image"
                      className="relative object-contain rounded-2xl p-2 w-75 h-75 md:w-100 md:h-100"
                    />
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Title: {prod.title.split(" ", 3).join(" ")}
                        <span>{prod.brand.name}</span>
                      </CardTitle>
                      <span>{prod.category.name}</span>
                      <CardDescription className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {[0, 1, 2, 3, 4].map((star, index) => {
                            const filledStar =
                              star < Math.round(prod.ratingsAverage);
                            return (
                              <React.Fragment key={index}>
                                <Star
                                  className={`size-4 ${filledStar ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                                />
                              </React.Fragment>
                            );
                          })}
                          <span className="accent-color">
                            {prod.ratingsAverage}
                          </span>
                        </div>
                        <p className="font-semibold second-color">
                          Price: {prod.price} EGP
                        </p>
                      </CardDescription>
                    </CardHeader>
                  </Link>
                  <AddToCart prodId={prod._id} />
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
