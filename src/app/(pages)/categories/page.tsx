import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryI} from "@/interfaces/categories";
import { getAllCategories } from "@/services/categories";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {

  const { data } = await getAllCategories()
  const category:CategoryI[] = data

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
                  <BreadcrumbLink href="/brands" className="accent-color">Brands</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Categories</BreadcrumbPage>
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
          {category.map((cat) => (
            <div key={cat._id}>
              <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 h-full hover:scale-105 duration-500 cursor-pointer w-100">
                <Link href={`/categories/${cat._id}`}>
                  <div className="relative" />
                  <Image src={cat.image} width={300} height={300} alt="product-cover-image"className="relative w-full md:object-cover object-contain rounded-2xl p-2 w-[300px] h-[300px] md:w-100 md:h-100"
                  />
                    <CardTitle className="text-center">
                      <span className="text-md font-semibold">{cat.name}</span>
                    </CardTitle>
                </Link>
              </Card>
            </div>
          ))}
          
        </div>
  </>
}
