import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export default async function Products() {
  const { data } = await getAllProducts();

  const products: productI[] = data;

  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto p-3 my-3 bg-blur flex justify-between">
          <div className="flex flex-col gap-2 items-start m-2">
            <h1 className="text-xl second-color font-bold paragraph">
              Everything You Love, One Click Away
            </h1>
            <Breadcrumb className="mt-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="accent-color">
                    Home
                  </BreadcrumbLink>
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

      <div className="max-w-7xl border border-gray-300 rounded-2xl  mx-auto mb-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:p-5">
        {products.map((prod) => (
          <div key={prod._id}>
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
                      {[0, 1, 2, 3, 4].map((star ,index) => {
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
                <AddToCart prodId={prod._id}/>
           
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
