"use client";
import { HiBars3 } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FolderHeart, HeartPlus, LogOutIcon, User, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function ToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="bg-gray-200 shadow rounded-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
             <MdOutlineShoppingCart className="size-6 text-gray-700"/>
            <Link href="/">
            <h2 className="nav-logo md:text-3xl text-2xl font-bold text-md accent-color">GoCart</h2>
            </Link>
           
          </div>
          <div>
            <ul className="md:flex hidden items-center font-light gap-5 capitalize md:text-xl text-gray-700">
              <li>
                <Link href="/products" className={path.includes("/products") ? "active" : ""}  >
                 products
                </Link>
              </li>
              <li>
                <Link href="/brands" className={path === "/brands" ? "active" : ""} >
                 brands
                </Link>
              </li>
              <li>
                <Link href="/categories" className={path === "/categories" ? "active" : ""} >
                categories
                </Link>
              </li>
            </ul>

            <div className="md:hidden transition-all duration-200" onClick={ToggleMenu}>
              {isOpen ? (  <IoIosClose className="size-8" /> ) : (<HiBars3 className="size-8" /> )}
            </div>
          </div>
          <div className="flex items-center gap-2">
              <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <User className="size-6 cursor-pointer"/>
           </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem> my cart</DropdownMenuItem>
          <DropdownMenuItem>register</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
        </DropdownMenu>
      
          <HeartPlus className="size-6 cursor-pointer"/>
          </div>
        </div>
      </nav>

      {isOpen && (
        <ul className="md:hidden p-2 bg-gray-50 flex items-center justify-center gap-4 capitalize font-semibold text-md text-gray-700">
        <li>
                <Link href="/products" className={path === "/products" ? "active" : ""} >
                 products
                </Link>
              </li>
              <li>
                <Link href="/brands" className={path === "/brands" ? "active" : ""} >
                 brands
                </Link>
              </li>
              <li>
                <Link href="/categories" className={path === "/categories" ? "active" : ""} >
                categories
                </Link>
              </li>
        </ul>
      )}
    </>
  );
}
