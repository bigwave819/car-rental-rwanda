"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

interface AdminNavProps {
  toggleSidebar: () => void;
}

function AdminNav({ toggleSidebar }: AdminNavProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-white">

      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <Menu size={22} />
      </button>

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default AdminNav;
