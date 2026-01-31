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
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react";
import AddToCart from "@/components/addToCart/addToCart";

 interface productIdType{
  productDetails:string
}

export default async function ProductId( { params } :{ params: Promise<productIdType> }) {
  const {  productDetails } = await params
  const {data} = await getSpecificProduct(productDetails)
  const product :productI = data

  console.log(data);
  
  return <>
  <header>
        <div className="max-w-7xl mx-auto p-5 m-3  bg-blur">
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
                  <BreadcrumbPage>Product Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
        </div>
  </header>

      <div className="max-w-7xl mx-auto bg-blur my-4">
        <div className="grid grid-cols-1  md:grid-cols-2 p-3 gap-2 md:gap-0">
            <div className="col-span-1 mx-auto pt-2 relative">
              <Image src={product.images[0]} alt="prod.details.img" height={300} width={300} className="rounded-3xl shadow"/>
              <Badge className="bg-white accent-color text-md absolute top-2 end-2 p-1 bg-blur">
                {product.ratingsAverage}
                 <Star className="text-yellow-400"/>
              </Badge>
            </div>
            <div className="col-span-1 pt-2 p-3 bg-gray-100 rounded-2xl second-color">
                <div className="flex-col flex gap-3">
                  <h5 className="text-xl">Product Details</h5>
                  <hr />
                <span>Product name: {product.title}</span>
                <span>Category: {product.subcategory[0].name}</span>
                <span>Brand: {product.brand.name}</span>
                <span>Description: {product.description}</span>
                <span>price: {product.price} EGP</span>
                <AddToCart prodId={product._id}/>
                </div>
                  <div className="flex items-center flex-wrap gap-3 my-5">
               {product.images.map((img , index )=>(
                <Image key={index} src={img} alt="prod.details.img" height={100} width={100}/>
               ) )}
              </div>
            </div>

        </div>
      </div>


  </>
}
