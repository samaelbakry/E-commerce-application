import Link from 'next/link'
import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

export default function Footer() {
  return <>
  <footer className="bg-gray-200 shadow">
    <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex items-center">
             <MdOutlineShoppingCart className="size-6 text-gray-700"/>
              <Link href="/" className="flex items-center">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-700">GOCART</span>
              </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold  uppercase">Resources</h2>
                  <ul className="text-body font-medium">
                      <li className="mb-4">
                          <Link href="" className="hover:underline">e-commerce</Link>
                      </li>
                      <li>
                          <Link href="" className="hover:underline">Tailwind CSS</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
                  <ul className="text-body font-medium">
                      <li className="mb-4">
                          <Link href="" className="hover:underline ">Github</Link>
                      </li>
                      <li>
                          <Link href="" className="hover:underline">linkedIn</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                  <ul className="text-body font-medium">
                      <li className="mb-4">
                          <Link href="#" className="hover:underline">Privacy Policy</Link>
                      </li>
                      <li>
                          <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-default sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-body sm:text-center">© 2026 <a href="https://flowbite.com/" className="hover:underline">GoCart™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-body hover:text-heading">
                
                <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-body hover:text-heading ms-5">
            <span className="sr-only">Twitter page</span>
            </a>
             <a href="#" className="text-body hover:text-heading ms-5">
                <span className="sr-only">GitHub account</span>
            </a>
          </div>
      </div>
    </div>
</footer>
  </>
}
