import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BrandI } from "@/interfaces/brands";
import { getSpecificBrand } from "@/services/brandsServices";
import Image from "next/image";

interface brandIdType {
  brandId: string;
}

export default async function BrandId({
  params,
}: {
  params: Promise<brandIdType>;
}) {
  const { brandId } = await params;
  const { data } = await getSpecificBrand(brandId);

  const specificBrand: BrandI = data;

  return (
    <>
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
                  <BreadcrumbLink href="/products" className="accent-color">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/brands" className="accent-color">Brands</BreadcrumbLink>
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

      <div className="max-w-7xl mx-auto bg-blur my-4 grid grid-cols-1  md:grid-cols-2 p-3 gap-2 md:gap-0">
        <div className="col-span-1 mx-auto pt-2 relative">
          <Image
            src={specificBrand.image}
            alt="prod.details.img"
            height={400}
            width={400}
            className="rounded-3xl shadow"
          />
        </div>
       
      </div>
    </>
  );
}
