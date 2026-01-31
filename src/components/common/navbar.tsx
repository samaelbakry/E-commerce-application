"use client";
import { HiBars3 } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Badge, HeartPlus, LogOut, ShoppingBasket, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data:sessionData } = useSession();

    // const [mounted, setMounted] = useState<boolean>(false);

  function ToggleMenu() {
    setIsOpen(!isOpen);
  }
  
  useEffect(() => {
    // setMounted(true)
   
  }, [])

  function logOut(){
   setTimeout(() => {
     signOut({callbackUrl:"/"})
   }, 1000);
  }
  

  return (
    <>
      <nav className="bg-gray-200 shadow rounded-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <MdOutlineShoppingCart className="size-6 text-gray-700" />
            <Link href="/">
              <h2 className="nav-logo md:text-3xl text-2xl font-bold text-md accent-color">
                GoCart
              </h2>
            </Link>
          </div>
          {/* mobile dropdown */}
          <div>
            <ul className="md:flex hidden items-center font-light gap-5 capitalize md:text-xl text-gray-700">
              <li>
                <Link
                  href="/products"
                  className={path.includes("/products") ? "active" : ""}
                >
                  products
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={path.includes("/brands") ? "active" : ""}
                >
                  brands
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={path === "/categories" ? "active" : ""}
                >
                  categories
                </Link>
              </li>
            </ul>

          </div>
          <div className="flex items-center gap-2">
            {/* {mounted && <> */}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="size-6 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  {sessionData? <>
                  <DropdownMenuItem  className="cursor-pointer">profile</DropdownMenuItem>
                  <DropdownMenuItem  className="cursor-pointer">orders</DropdownMenuItem>
                  </> : <>
                    <DropdownMenuItem>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  </>
                  }
                
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={logOut} variant="destructive" className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {sessionData ? <>
            <Link href='/wishlist'>
            <HeartPlus className="size-6 cursor-pointer" />
            </Link>
           <Link href='/cart'>
            <ShoppingBasket  className="size-6 cursor-pointer"/>
           </Link>
            </> : "" }
            
            {/* </>} */}
          </div>
            <div
              className="md:hidden cursor-pointer transition-all duration-200"
              onClick={ToggleMenu}
            >
              {isOpen ? (
                <IoIosClose className="size-8" />
              ) : (
                <HiBars3 className="size-8" />
              )}
            </div>
        </div>
      </nav>

      {isOpen && (
        <ul className="md:hidden p-2 bg-gray-50 flex items-center justify-center gap-4 capitalize font-semibold text-md text-gray-700">
          <li>
            <Link
              href="/products"
              className={path === "/products" ? "active" : ""}
            >
              products
            </Link>
          </li>
          <li>
            <Link href="/brands" className={path === "/brands" ? "active" : ""}>
              brands
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className={path === "/categories" ? "active" : ""}
            >
              categories
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
