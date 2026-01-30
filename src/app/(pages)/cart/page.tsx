import { Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  return (
    <>
      <div className="max-w-8xl mx-auto my-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* CART REVIEW */}
          <div className="col-span-1 md:col-span-2 p-2">
            <header className="bg-gray-100 p-5 m-3 max-w-3xl rounded-xl shadow-xl flex items-center flex-wrap md:gap-0 gap-2 justify-between">
              <div>
                <h1 className="md:text-4xl text-xl font-semibold accent-color">
                  Shopping Cart
                </h1>
                <p className="mt-2 text-md font-normal second-color">
                  Almost there! Review your cart
                </p>
              </div>
            </header>
            <div className="flex flex-wrap items-center justify-between  m-4 bg-blur">
              <div className="flex items-center md:gap-2 gap-0">
                <img src="file.svg" alt="" className="size-30 p-3" />
                <div className="flex flex-col gap-3">
                <span> product title</span>
                <span> product brand</span>
                <div className="flex items-center gap-2">
                  <Minus className="size-6 bg-gray-200 shadow rounded-lg p-1 text-lg cursor-pointer hover:scale-105"/>
                  <span>count</span>
                  <Plus  className="size-6 bg-gray-200 shadow rounded-lg p-1 text-lg cursor-pointer hover:scale-105"/>
                </div>
                </div>
              </div>
               <div className="flex sm:flex-col items-center m-3 gap-4">
                <span> 400 EGP</span>
                <button className="delete-btn flex items-center gap-0.5">
                  Remove
                  <Trash2 />
                  </button>
                </div>
            </div>
          </div>
          {/* CHECKOUT PAYMENT */}
          <div className="col-span-1 md:col-span-2 p-2">
            <h6 className="text-lg font-semibold m-1">CHECKOUT PAYMENT</h6>
            <div className="border border-gray-300 rounded-2xl shadow p-4 mx-2">
              <h6 className="text-2xl font-bold">Order Summary</h6> 
              <div className="flex items-center justify-between">
                <span>total items: 3 items</span>
                <span className="text-lg">400 EGP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">shipping</span>
                <span className="font-bold accent-color text-lg">free</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">total </span>
                <span className="font-bold accent-color text-lg">500EGP</span>
              </div>
               <button className="bg-gray-100 w-full font-semibold accent-color md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer mb-2 shadow">proceed to checkout</button>
                 <Link href="/products">
                  <button className="bg-cyan-800 w-full font-semibold text-white md:px-3 py-1 px-2 text-lg rounded-lg cursor-pointer shadow">
                    Continue Shopping
                  </button>
                </Link>
                <div className="flex justify-end m-2">
              <button className="delete-btn flex items-center gap-0.5">
                  Clear Cart
                  <Trash2 />
                  </button>
            </div>
                  
            </div>
          
           
           
          </div>


        </div>
      </div>
    </>
  );
}
