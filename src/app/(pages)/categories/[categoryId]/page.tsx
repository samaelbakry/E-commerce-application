import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryI } from "@/interfaces/categories";
import { productI } from "@/interfaces/products";
import { getAllCategories, getSpecificCategory } from "@/services/categories";
import { getAllProducts } from "@/services/productsServices";
import Image from "next/image";


interface catIdType {
  catId: string;
}

export default async function SpecificCategory({params}: { params: Promise<catIdType>;}) {

    const { catId } = await params;
    const specificCat : CategoryI  = await getSpecificCategory(catId);
    console.log("categories details",specificCat);

    const { data: allProducts}:{ data: productI[] } = await getAllProducts();

     const productCategory = allProducts.filter(
     (prod) => prod.category?._id === catId,
     );


  return <>
  <div className="max-w-7xl mx-auto bg-blur my-4 p-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
      {productCategory.map((prod) => (
        <div key={prod._id} className="col-span-1 mx-auto pt-2 relative">
          <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 md:h-140 h-120 hover:scale-105 duration-500 cursor-pointer w-100">
            <Image
              src={prod.imageCover}
              width={300}
              height={300}
              alt={prod.title}
              className="relative object-contain rounded-2xl p-2 w-75 h-75 md:w-100 md:h-100"
            />
            <CardHeader>
              <CardTitle>{prod.category.name}</CardTitle>
            </CardHeader>
            
          </Card>
        </div>
      ))}
    </div>

  </>
}
