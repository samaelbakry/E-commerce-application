"use client";
import { OrderI } from "@/interfaces/orders";
import { cartContext } from "@/providers/cartDataProvider";
import { getUserOrders } from "@/services/productsServices";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function Allorders() {
  const { data } = useContext(cartContext);
  const [orders, setOrders] = useState<OrderI[] | []>([])
//   const id = data?.data.cartOwner as string;
const id: string | undefined = data?.data?.cartOwner;


  async function getOrders(id: string) {
    const orders = await getUserOrders(id);
    setOrders(orders)
    console.log(orders);
  }

  useEffect(() => {
    if (!id) return;
    getOrders(id);
  }, [id]);

  return <>
  <div className="max-w-7xl border border-gray-300 rounded-2xl mx-auto mb-5 mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:p-5">
  {orders.map((order) => (
    <div key={order._id} className="flex justify-evenly gap-5 p-5 bg-blur rounded-2xl w-full">
      <div className="flex flex-wrap gap-4">
        {order.cartItems.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <Image
              src={item.product.imageCover}
              className="object-contain rounded-2xl"
              width={100}
              height={100}
              alt={item.product.title}
            />
            <span className="text-sm mt-1">{item.product.brand.name}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col gap-2 text-left">
        <span><strong>Name:</strong> {order.user.name}</span>
        <span><strong>Details:</strong> {order.shippingAddress.details}</span>
        <span><strong>Phone:</strong> {order.shippingAddress.phone}</span>
        <span><strong>City:</strong> {order.shippingAddress.city}</span>
        <span><strong>Payment Method:</strong> {order.paymentMethodType}</span>
        <span><strong>Total Price:</strong> {order.totalOrderPrice} EGP</span>
      </div>

    </div>
  ))}
</div>


  

  </>;
}
