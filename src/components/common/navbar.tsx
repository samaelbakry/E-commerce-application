"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cartContext } from "@/providers/cartDataProvider";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
  const { noOfCartItems, noOfwishlistItems, isLoading } = useContext(cartContext);
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: sessionData } = useSession();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function logOut() {
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1000);
  }

  const linkClass = (active: boolean) =>
    `relative text-sm font-medium tracking-wide pb-1 transition-all duration-200 capitalize ${
      active
        ? "text-zinc-900 font-semibold"
        : "text-zinc-500 hover:text-zinc-900"
    }`;

  return (
    <div className="w-full bg-stone-50/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white transition-colors group-hover:bg-emerald-600 duration-300">
              <ShoppingBag className="size-4.5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              GOCART
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-6 ml-4">
            {["products", "brands", "categories"].map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item}`} 
                  className={linkClass(path.includes(`/${item}`))}
                >
                  {item}
                  {path.includes(`/${item}`) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-fade-in" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center size-9 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 transition-colors cursor-pointer outline-none">
                <User className="size-4.5 text-zinc-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 mt-1" align="end">
              <DropdownMenuGroup>
                {sessionData ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/allorders">Orders</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={logOut}
                  variant="destructive"
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {sessionData && (
            <div className="flex items-center gap-3">
              <Link href="/wishlist" className="relative flex items-center justify-center size-9 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 transition-colors cursor-pointer">
                <Heart className="size-4.5 text-zinc-700" />
                <Badge className="bg-zinc-900 text-white rounded-full min-w-5 h-5 flex items-center justify-center p-0 text-[10px] absolute -top-1.5 -end-1.5 border border-white">
                  {isLoading ? <Spinner className="size-2.5" /> : noOfwishlistItems}
                </Badge>
              </Link>

              <Link href="/cart" className="relative flex items-center justify-center size-9 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 transition-colors cursor-pointer">
                <ShoppingBag className="size-4.5 text-zinc-700" />
                <Badge className="bg-emerald-600 text-white rounded-full min-w-5 h-5 flex items-center justify-center p-0 text-[10px] absolute -top-1.5 -end-1.5 border border-white">
                  {isLoading ? <Spinner className="size-2.5" /> : noOfCartItems}
                </Badge>
              </Link>
            </div>
          )}

          <button
            className="md:hidden flex items-center justify-center size-9 rounded-full border border-zinc-200 bg-white text-zinc-700 cursor-pointer hover:bg-zinc-50 transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </nav>

     {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white animate-in slide-in-from-top duration-200">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {["products", "brands", "categories"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium capitalize transition-colors ${
                    path.includes(`/${item}`) ? "text-emerald-600" : "text-zinc-600"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}