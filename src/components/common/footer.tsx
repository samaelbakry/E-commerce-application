import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 shadow">
        <div className="mx-auto w-full max-w-7xl p-0 py-2">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 flex items-center">
              <MdOutlineShoppingCart className="size-6 text-gray-700" />
              <Link href="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-700">
                  GOCART
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 lg:grid-cols-5 mt-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">Shop</h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link href="/products" className="hover:underline">
                      All Products
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/categories" className="hover:underline">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/offers" className="hover:underline">
                      Offers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Customer Service
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link href="/contact" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/faq" className="hover:underline">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="hover:underline">
                      Shipping & Returns
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  My Account
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link href="/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/register" className="hover:underline">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="hover:underline">
                      My Orders
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">About</h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link href="/about" className="hover:underline">
                      About GoCart
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Contact
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">Email: support@gocart.com</li>
                  <li>Phone: +20 100 000 0000</li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-default sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-body sm:text-center">
              © 2026 <a className="hover:underline">GoCart™</a>. All Rights
              Reserved.
            </span>
            <div className="flex gap-4 mt-4 font-semibold">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
