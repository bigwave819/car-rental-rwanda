"use client";

import Link from "next/link";
import { Car, Users, CalendarDays, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { Spinner } from "../ui/spinner";

interface SideBarProps {
  isOpen: boolean;
}

function SideBar({ isOpen }: SideBarProps) {
  const links = [
    { id: 1, name: "Cars", path: "/admin/cars", icon: Car },
    { id: 2, name: "Users", path: "/admin/users", icon: Users },
    { id: 3, name: "Bookings", path: "/admin/bookings", icon: CalendarDays },
  ];

  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className={`bg-white border-r transition-all duration-300 flex flex-col h-full
      ${isOpen ? "w-64" : "w-0 overflow-hidden md:w-20"}`}
    >
      <div className="p-4 space-y-2 flex-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 p-3 transition-colors
                ${isActive ? "bg-slate-100 text-black font-semibold" : "text-slate-600 hover:bg-slate-50"}
              `}
            >
              <Icon size={20} />
              {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t">
        <button
          disabled={loading}
          onClick={() => handleSignOut()}
          className={`flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-all w-full
            ${!isOpen && "justify-center"}`}
        >
          {loading ? <Spinner /> : <LogOut size={20} />}
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;