import { productI } from "./products"

export interface cartI {
  status: string
  numOfCartItems: number
  cartId: string
  data: cartDataI
}

export interface cartDataI {
  _id: string
  cartOwner: string
  products: cartProductI[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface cartProductI{
    count: number
     _id: string
     product: productI
     price: number
}

export interface cartQuantityI{
  handleCartNumber:()=>void
  noOfCartItems: number
  noOfwishlistItems: number
}