"use client"
import { getUserWishlist } from "@/actions/wishlistAction";
import AddToCart from "@/components/addToCart/addToCart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productI } from "@/interfaces/products";
import { wishlistI } from "@/interfaces/wishlist";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default  function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<productI[] | []>([])

  async function getWishlist() {
      const data: wishlistI= await getUserWishlist();
      console.log(data);
      
      setWishlistProducts(data.data)
      //  setWishlistProducts(Array.isArray(data.data) ? data.data : []);
      
  }

  useEffect(() => {
    getWishlist()
  }, [])
  

  return (
    <>
      <header>
        <div className="max-w-7xl md:mx-auto mx-5 p-3 my-3 bg-blur flex flex-wrap justify-between">
          <div className="flex flex-col gap-2 items-start m-2">
            <h1 className="text-xl second-color font-bold">WISHLIST</h1>
            <p className="mt-2 text-gray-600 text-md">
              Locked in. Ready when you are
            </p>
          </div>
          {wishlistProducts.length >= 1 ? (
            <>
              <Link href="/cart">
                <button className="text-md text-white font-semibold rounded-xl bg-cyan-700 p-2 cursor-pointer">
                  Go to your cart
                </button>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </header>

      <div className="max-w-7xl border border-gray-300 rounded-2xl mx-5 md:mx-auto mb-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:p-5">
        {wishlistProducts.length === 0 ? (
          <>
           <div className="flex flex-col gap-2 m-2 md:m-0">
             <span className="text-xl font-semibold">No items yet</span>
            <Link href="/products">
              <button className="text-md text-white font-semibold rounded-xl bg-cyan-700 p-2 cursor-pointer">
                Go Shopping!
              </button>
            </Link>
           </div>
          </>
        ) : (
          <>
            {wishlistProducts.map((prod) => (
              <div key={prod._id}>
                <Card className="relative mx-auto md:w-full bg-blur pt-0 mt-2 md:h-140 h-120 hover:scale-105 duration-500 cursor-pointer w-100">
                  <Link href={`/products/${prod._id}`}>
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
                        Title: {prod.title.split(" " , 3).join("")}
                        <span>{prod.brand.name}</span>
                      </CardTitle>
                      <span>{prod.category.name}</span>
                      <CardDescription className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {[0, 1, 2, 3, 4].map((star, index) => {
                            const filledStar = star < Math.round(prod.ratingsAverage);
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
                  <AddToCart prodId={prod._id} wishlistPage wishlistProducts={wishlistProducts} setWishlistProducts={setWishlistProducts} />
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
