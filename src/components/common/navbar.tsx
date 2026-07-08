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
import { HeartPlus, ShoppingBasket, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

const THEME = {
  "--paper": "#FFFEF8",
  "--ink": "#1C1B17",
  "--mustard": "#E8A33D",
  "--mustard-ink": "#B9781F",
  "--red": "#C1443C",
} as React.CSSProperties;

export default function Navbar() {
  const { noOfCartItems, noOfwishlistItems, isLoading } = useContext(cartContext);
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: sessionData } = useSession();

  function ToggleMenu() {
    setIsOpen(!isOpen);
  }

  function logOut() {
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1000);
  }

  const linkClass = (active: boolean) =>
    `relative font-mono text-sm uppercase tracking-wider pb-1 transition-colors ${
      active
        ? "text-[var(--ink)] border-b-2 border-dashed border-[var(--mustard-ink)]"
        : "text-[var(--ink)]/60 hover:text-[var(--mustard-ink)]"
    }`;

  return (
    <div style={THEME}>
      <nav className="relative bg-[var(--paper)] shadow-sm rounded-xl border border-dashed border-[var(--ink)]/15">
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />

        <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <MdOutlineShoppingCart className="size-6 text-[var(--mustard-ink)]" />
            <Link href="/">
              <h2 className="nav-logo md:text-3xl text-2xl font-black text-[var(--ink)]">
                GoCart
              </h2>
            </Link>
          </div>

          <div>
            <ul className="md:flex hidden items-center gap-8">
              <li>
                <Link href="/products" className={linkClass(path.includes("/products"))}>
                  products
                </Link>
              </li>
              <li>
                <Link href="/brands" className={linkClass(path.includes("/brands"))}>
                  brands
                </Link>
              </li>
              <li>
                <Link href="/categories" className={linkClass(path.includes("/categories"))}>
                  categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex items-center justify-center size-8 md:size-10 rounded-full border border-dashed border-[var(--ink)]/20 hover:border-[var(--mustard-ink)]/60 transition-colors cursor-pointer">
                  <User className="size-4 md:size-5 text-[var(--ink)]/80" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  {sessionData ? (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/allorders">Orders</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href="/register">Register</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
                    className="cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {sessionData ? (
              <>
                <span className="relative">
                  <Link href="/wishlist">
                    <span className="flex items-center justify-center size-8 md:size-10 rounded-full border border-dashed border-[var(--ink)]/20 hover:border-[var(--red)]/60 transition-colors cursor-pointer">
                      <HeartPlus className="size-4 md:size-5 text-[var(--ink)]/80" />
                    </span>
                    <Badge className="bg-[var(--red)]/10 text-[var(--red)] border border-dashed border-[var(--red)]/40 absolute -top-1.5 -end-1.5 font-mono">
                      {isLoading ? <Spinner /> : <>{noOfwishlistItems}</>}
                    </Badge>
                  </Link>
                </span>
                <span className="relative">
                  <Link href="/cart">
                    <span className="flex items-center justify-center size-8 md:size-10 rounded-full border border-dashed border-[var(--ink)]/20 hover:border-[var(--red)]/60 transition-colors cursor-pointer">
                      <ShoppingBasket className="size-4 md:size-5 text-[var(--ink)]/80" />
                    </span>
                    <Badge className="bg-[var(--red)]/10 text-[var(--red)] border border-dashed border-[var(--red)]/40 absolute -top-1.5 -end-1.5 font-mono">
                      {isLoading ? <Spinner /> : <>{noOfCartItems}</>}
                    </Badge>
                  </Link>
                </span>
              </>
            ) : (
              ""
            )}
          </div>

          <div
            className="md:hidden flex items-center justify-center size-8 rounded-full border border-dashed border-[var(--ink)]/20 cursor-pointer transition-all duration-200"
            onClick={ToggleMenu}
          >
            {isOpen ? (
              <IoIosClose className="size-6 text-[var(--ink)]" />
            ) : (
              <HiBars3 className="size-5 text-[var(--ink)]" />
            )}
          </div>
        </div>
      </nav>

      {isOpen && (
        <ul className="md:hidden mt-2 p-3 bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl flex items-center justify-center gap-6">
          <li>
            <Link href="/products" className={linkClass(path === "/products")}>
              products
            </Link>
          </li>
          <li>
            <Link href="/brands" className={linkClass(path === "/brands")}>
              brands
            </Link>
          </li>
          <li>
            <Link href="/categories" className={linkClass(path === "/categories")}>
              categories
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
