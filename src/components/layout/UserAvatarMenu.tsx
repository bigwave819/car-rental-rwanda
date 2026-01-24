"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client";

interface Props {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function UserAvatarMenu({ user }: Props) {
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image || "/avatar.jpg"} />
          <AvatarFallback>
            {(user.name || user.email)?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="truncate">
          {user.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="flex items-center gap-2">
            <UserIcon size={16} /> View Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
