import AddToCart from "@/components/addToCart/addToCart";
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
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface catIdType {
  categoryId: string;
}

export default async function SpecificCategory({ params }: { params: Promise<catIdType>;}) {
  const { categoryId } = await params;
  const specificCat: CategoryI = await getSpecificCategory(categoryId);
  const { data: allProducts }: { data: productI[] } = await getAllProducts();

  const productCategory = allProducts.filter(
    (prod) => prod.category?._id === categoryId,
  );

  return (
    <>
      <div className="max-w-7xl mx-auto bg-blur my-4 p-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        {productCategory.length === 0 ? (
          <>
            <div className="col-span-full text-center py-5 text-lg font-semibold">
              This category is currently empty — new items coming soon.
            </div>
          </>
        ) : (
          <>
            {productCategory.map((prod) => (
              <div key={prod._id} className="col-span-1 mx-auto pt-2 relative">
                <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 md:h-140 h-120 hover:scale-105 duration-500 cursor-pointer w-100">
                  {/* <Link href={`/products/${prod.id}`}> */}
                  <Image
                    src={prod.imageCover}
                    width={300}
                    height={300}
                    alt={prod.title}
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
                     <AddToCart prodId={prod._id} />
                  </CardHeader>
                  {/* </Link> */}
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
