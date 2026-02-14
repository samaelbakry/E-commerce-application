"use client";
import { OrderI } from "@/interfaces/orders";
import { cartContext } from "@/providers/cartDataProvider";
import { getUserOrders } from "@/services/productsServices";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

export default function AllOrders() {
  const { data } = useContext(cartContext);
  const [orders, setOrders] = useState<OrderI[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id: string | undefined = data?.data?.cartOwner;

  async function getOrders(id: string) {
    try {
      setIsLoading(true);
      const orders = await getUserOrders(id);
      setOrders(orders);
      console.log(orders);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    getOrders(id);
  }, [id]);

  return (
    <>
    {isLoading ?  <>
            <div className="flex justify-center items-center p-10 my-5">
              <ImSpinner9 className="size-6 md:size-8 second-color animate-spin" />
            </div>
          </> :  <>
           <div className="max-w-7xl border border-gray-300 rounded-2xl mx-auto mb-5 mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:p-5">
       
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex justify-evenly gap-5 p-5 bg-blur rounded-2xl"
          >
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
                  <span className="text-sm mt-1">
                    {item.product.brand.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-left text-sm md:text-base">
              <span>
                <strong>Name:</strong> {order.user.name}
              </span>
              <span>
                <strong>Details:</strong> {order.shippingAddress.details}
              </span>
              <span>
                <strong>Phone:</strong> {order.shippingAddress.phone}
              </span>
              <span>
                <strong>City:</strong> {order.shippingAddress.city}
              </span>
              <span>
                <strong>Payment Method:</strong> {order.paymentMethodType}
              </span>
              <span>
                <strong>Total Price:</strong> {order.totalOrderPrice} EGP
              </span>
            </div>
          </div>
        ))}
  
      </div>
          </> }
     
    </>
  );
}
