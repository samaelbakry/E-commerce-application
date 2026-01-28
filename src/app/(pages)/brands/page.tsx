import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BrandI } from "@/interfaces/brands";
import { getAllBrands } from "@/services/brandsServices";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {

  const {data} = await getAllBrands()
  const brands:BrandI[] = data

  return <>
   <header>
        <div className="max-w-7xl mx-auto p-3 my-3 bg-blur flex justify-between">
          <div className="flex flex-col gap-2 items-start m-2">
            <Breadcrumb className="mt-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="accent-color">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products" className="accent-color">products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Brands</BreadcrumbPage>
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

      <div className="max-w-7xl bg-blur mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:p-4">
        {brands.map((brand)=>(
          <div key={brand._id}>
            <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 h-full w-90 hover:scale-105 duration-500 cursor-pointer">
                <Link href={`/brands/${brand._id}`}>
                  <div className="relative" />
                  <Image src={brand.image} width={400} height={400} alt="brand-cover-image"className="relative  object-contain rounded-2xl p-2"
                  />
                </Link>
                <h5 className="text-2xl text-center">{brand.name}</h5>
              </Card>
          </div>
        ))}


      </div>
  </>
}
