"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import UserAvatarMenu from "./UserAvatarMenu";

interface NavbarClientProps {
  session: any;
}

function NavbarClient({ session }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cars", href: "/cars" },
  ];

  if (pathname.startsWith("/admin") || pathname === "not-found") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">

          <h1 className="text-xl font-bold text-black">Car Rental</h1>

          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
              
            ))}
            { session && ( <Link href={`/bookings`}>Bookings</Link> ) }
          </div>

          <div className="hidden md:block">
            {session?.user ? (
              <UserAvatarMenu user={session.user} />
            ) : (
              <button onClick={() => router.push("/auth")} className="btn">
                Sign In
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="block py-2">
              {link.name}
            </Link>
          ))}

          {session?.user ? (
            <UserAvatarMenu user={session.user} />
          ) : (
            <button onClick={() => router.push("/auth")} className="btn w-full">
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavbarClient;
