"use client";

import React from "react";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserMenuLinks } from "@/components/layout/user-menu-links";
import { Role } from "@prisma/client";

interface UserMenuProps {
  user: User & { role: Role; rollNo?: string | null; department?: string | null };
}

export function UserMenu({ user }: UserMenuProps) {
  const badgeVariant = user.role === "ADMIN" ? "destructive" : user.role === "FACULTY" ? "purple" : "default";
  const initials = user.name ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "EE";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <div className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{user.name}</span>
            <span className="text-[10px] text-slate-500 font-mono capitalize">{user.role.toLowerCase()}</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-xl">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user.name}</p>
              <Badge variant={badgeVariant as any} className="text-[9px] px-1.5 py-0">{user.role}</Badge>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserMenuLinks role={user.role} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
