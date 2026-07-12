"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
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

  async function getOrders(userId: string) {
    try {
      setIsLoading(true);
      const res = await getUserOrders(userId);
      setOrders(res ?? []);      
    } catch (error) {
      console.error("Failed fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    getOrders(id);
  }, [id]);

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen relative flex flex-col justify-between overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full grid grid-cols-4 pointer-events-none px-6">
        <div className="border-r border-stone-200/40 h-full w-full" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="border-r border-stone-200/40 h-full w-full hidden md:block" />
        <div className="h-full w-full" />
      </div>

      <header className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-10">
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-stone-900 transition-colors">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-stone-900 font-medium">
                    Orders
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-stone-900">
              Fulfillment <span className="font-serif italic text-emerald-600">Archive</span>
            </h1>
          </div>

          <p className="max-w-xs text-sm text-stone-500 font-light leading-relaxed">
            A comprehensive tracking record of your verified acquisitions, dispatches, and design logs.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-10 flex-1 my-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <ImSpinner9 className="size-8 text-emerald-600 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 max-w-sm mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
              No acquisitions recorded
            </span>
            <p className="text-sm text-stone-500 font-light">
              Your transactional matrix is empty. Ready for new design paths.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, orderIdx) => (
              <Card 
                key={order._id} 
                className="bg-transparent border-none p-0 shadow-none rounded-none flex flex-col md:grid md:grid-cols-4 gap-6 pb-8 border-b border-stone-200"
              >
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                    Entry /{orderIdx + 1}
                  </div>
                  <h4 className="text-xs font-bold font-mono text-stone-900 uppercase tracking-wide">
                    ID: {order._id.slice(-8)}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-600/30 bg-emerald-50 text-[10px] font-mono uppercase tracking-wider text-emerald-700">
                    <span className="w-1 h-1 bg-emerald-600 rounded-full animate-pulse" />
                    {order.paymentMethodType}
                  </div>
                  <div className="text-lg font-mono font-medium text-stone-900 pt-2">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </div>
                </div>

                <div className="md:col-span-2">
                  <span className="block font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-3">
                    Items Contained
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.cartItems.map((item) => (
                      <div 
                        key={item._id} 
                        className="flex flex-col items-center bg-white border border-stone-200 p-3 rounded-lg hover:border-stone-400 transition-colors duration-200"
                      >
                        <div className="w-16 h-16 flex items-center justify-center mix-blend-multiply mb-2">
                          <Image
                            src={item.product.imageCover}
                            className="object-contain max-h-full w-auto"
                            width={80}
                            height={80}
                            alt={item.product.title}
                          />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 text-center line-clamp-1 w-full">
                          {item.product.brand.name}
                        </span>
                        <span className="text-[11px] font-medium text-stone-800 text-center line-clamp-1 w-full mt-0.5">
                          {item.product.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-stone-600 border-t border-dashed border-stone-200 pt-4 md:pt-0 md:border-t-0 md:pl-4">
                  <span className="block font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Logistics Manifest
                  </span>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between md:flex-col lg:flex-row lg:justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-400 text-[11px]">Recipient:</span>
                      <span className="text-stone-900 font-sans font-medium">{order.user.name}</span>
                    </div>
                    
                    <div className="flex justify-between md:flex-col lg:flex-row lg:justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-400 text-[11px]">Destination:</span>
                      <span className="text-stone-900 text-right md:text-left lg:text-right">{order.shippingAddress.city}</span>
                    </div>

                    <div className="flex justify-between md:flex-col lg:flex-row lg:justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-400 text-[11px]">Contact:</span>
                      <span className="text-stone-900">{order.shippingAddress.phone}</span>
                    </div>

                    <div className="pt-1">
                      <span className="text-stone-400 text-[11px] block mb-0.5">Route Address:</span>
                      <p className="text-stone-900 font-sans text-[11px] font-light leading-relaxed line-clamp-2">
                        {order.shippingAddress.details}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}