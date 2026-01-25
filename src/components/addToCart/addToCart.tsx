import { HeartPlus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";


export default function AddToCart() {
  return <>
    <CardFooter className="flex items-center gap-2 cursor-pointer">
        <Button className="w-1/2 grow cursor-pointer"><ShoppingCart/>Add to Cart</Button>
        <HeartPlus/>
      </CardFooter>
  </>
}
