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

export default function ProductCard() {
  return<>
  <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-2xl p-3"
      />
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <span>product rate</span>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-2">
        <Button className="w-1/2 grow"> <ShoppingCart />Add to Cart </Button>
        <HeartPlus/>
      </CardFooter>

    </Card>
  </>
}
