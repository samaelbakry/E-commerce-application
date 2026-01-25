import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { productI } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsServices";
import Link from "next/link";
import { Card,CardDescription, CardHeader,CardTitle,} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import AddToCart from "@/components/addToCart/addToCart";
import React from "react";

export default async function Products() {
  const { data } = await getAllProducts();
  
  const products:productI[] = data
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto p-3 my-3 bg-blur flex justify-between">
          <div className="flex flex-col gap-2 items-start m-2">
            <p className="md:text-xl text-md second-color paragraph">
              Everything You Love, One Click Away
            </p>
            <Breadcrumb className="mt-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </header>

      <div className="max-w-7xl bg-blur mx-auto mb-5 mt-5 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:p-2">
          {products.map((prod) => (
            <div key={prod._id}>
              <Card className="relative mx-auto w-full bg-blur pt-0 mt-2 h-full">
                <Link href={`/products/${prod.id}`}>
                  <div className="relative" />
                  <Image src={prod.imageCover} width={400} height={400} alt="product-cover-image"className="relative w-full object-contain rounded-2xl p-4"
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Title: {prod.title.split(" ", 3).join(" ")}
                      <span>{prod.brand.name}</span>
                    </CardTitle>
                    <span>{prod.category.name}</span>
                    <CardDescription className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3, 4].map((star) => {
                          const filledStar = star < Math.round(prod.ratingsAverage);
                          return (
                            <>
                              <Star className={`size-4 ${filledStar ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}/>
                            </>
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

                <AddToCart />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
