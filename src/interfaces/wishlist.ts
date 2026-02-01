import { productI } from "./products"

export interface wishlistI {
  status: string
  count: number
  data: productI[]
}