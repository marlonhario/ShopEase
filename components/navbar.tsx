"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const paths = [
  { path: "/", tab: "Home" },
  { path: "/products", tab: "Products" },
  { path: "/checkout", tab: "Checkout" },
];

export const Navbar = () => {
  const router = useRouter();
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md fixed w-full z-50 px-6 md:px-20">
      <div className="container mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Gradient Text Logo with drop shadow */}
          <span className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-md">
            ShopEase
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          {paths.map((path) => {
            return (
              <Link
                href={path.path}
                className={`${pathname === path.path ? "text-indigo-600" : ""} text-gray-700 hover:text-indigo-600 relative`}
                key={path.path}
              >
                {path.tab}
                <span
                  className={clsx(
                    "absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-600 transition-all duration-300",
                    pathname === path.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}

          {/* Cart */}
          <Button onClick={() => router.push("/checkout")} variant="ghost" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </nav>

        <div className="md:hidden">
          {/* Cart */}
          {!mobileMenuOpen && (
            <Button
              onClick={() => router.push("/checkout")}
              variant="ghost"
              className="relative p-2 mr-3"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/checkout"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Checkout
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              className="relative p-2 w-fit"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/checkout");
              }}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
