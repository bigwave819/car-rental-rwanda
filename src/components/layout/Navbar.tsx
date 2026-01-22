'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePathname } from 'next/navigation'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  const pathname = usePathname()

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cars", href: "/cars" },
  ];

  if (pathname.startsWith('/admin') || pathname === "not-found") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Title */}
          <div className="">
            <h1 className="text-xl text-black font-bold">Car Rental</h1>
          </div>

          {/* Links - hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <button onClick={() => router.push('/auth')} className="btn">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
