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
            className={`bg-white text-black min-h-screen transition-all duration-300
      ${isOpen ? "w-56" : "w-0 overflow-hidden md:w-16"}`}
        >
            <div className="p-4 space-y-2">
                {links.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={`flex items-center gap-3 p-2 transition
                ${isActive
                                    ? "bg-black/10 text-black"
                                    : "text-gray-700 hover:bg-gray-100"
                                }
              `}
                        >
                            <Icon size={20} />
                            {isOpen && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </div>

            <div className="absolute bottom-4 px-2">
                <button 
                    disabled={loading} 
                    onClick={() => handleSignOut()} 
                    className={` ${isOpen && `w-full`} btn flex flex-row space-x-5`}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Loading...
                        </>
                    ) : (
                        <>
                            <LogOut size={20} />
                            {isOpen && <span>Logout</span>}
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}

export default SideBar;
