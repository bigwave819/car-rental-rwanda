"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

interface AdminNavProps {
  toggleSidebar: () => void;
}

function AdminNav({ toggleSidebar }: AdminNavProps) {
  return (
    <header className="h-14 border-b flex items-center shrink-0 justify-between px-4 bg-white z-10">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-slate-100 transition-colors"
      >
        <Menu size={22} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarFallback className="bg-slate-200 text-xs">AD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 cursor-pointer font-medium">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default AdminNav;