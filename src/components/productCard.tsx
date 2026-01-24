import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge, HeartPlus, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { productI } from "@/interfaces/products"
import Image from "next/image"

export default function ProductCard({prod}:{prod:productI} ) {
  return<>
  <Card className="relative mx-auto w-full bg-blur pt-0 mt-2 h-full">
      <div className="absolute inset-0" />
      <Image src={prod.imageCover}
      width={400}
      height={400}
      alt="product-cover-image"
        className="relative w-full object-contain rounded-2xl p-4"
      />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">Title: {prod.title.split(" " , 3).join(" ")}
          <span>{prod.brand.name}</span>
        </CardTitle>
         <span>{prod.category.name}</span>
        <CardDescription className="flex justify-between items-center">
           <span className="accent-color">{prod.ratingsAverage}</span>
      <p className="font-semibold second-color">Price: {prod.price} EGP</p>
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-2 cursor-pointer">
        <Button className="w-1/2 grow cursor-pointer"><ShoppingCart/>Add to Cart</Button>
        <HeartPlus/>
      </CardFooter>

    </Card>
  </>
}
