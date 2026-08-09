import React from "react";
import Link from "next/link";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LayoutDashboard, CalendarCheck, PlusCircle, ShieldAlert, Bell, User as UserIcon, LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { Role } from "@prisma/client";

interface UserMenuLinksProps {
  role: Role;
}

export function UserMenuLinks({ role }: UserMenuLinksProps) {
  const dashboardHref =
    role === "ADMIN"
      ? "/dashboard/admin"
      : role === "FACULTY"
      ? "/dashboard/faculty"
      : "/dashboard/student";

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href={dashboardHref} className="flex items-center gap-2 cursor-pointer font-medium py-1.5 rounded-xl">
          <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard Overview
        </Link>
      </DropdownMenuItem>

      {role === "STUDENT" && (
        <>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/student/registrations" className="flex items-center gap-2 cursor-pointer py-1.5 rounded-xl">
              <CalendarCheck className="w-4 h-4 text-emerald-500" /> My Enrolled Events
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/student/notifications" className="flex items-center gap-2 cursor-pointer py-1.5 rounded-xl">
              <Bell className="w-4 h-4 text-amber-500" /> Notifications
            </Link>
          </DropdownMenuItem>
        </>
      )}

      {role === "FACULTY" && (
        <DropdownMenuItem asChild>
          <Link href="/dashboard/faculty/events/create" className="flex items-center gap-2 cursor-pointer py-1.5 rounded-xl">
            <PlusCircle className="w-4 h-4 text-purple-500" /> Create Event
          </Link>
        </DropdownMenuItem>
      )}

      {role === "ADMIN" && (
        <DropdownMenuItem asChild>
          <Link href="/dashboard/admin/users" className="flex items-center gap-2 cursor-pointer py-1.5 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-red-500" /> User Management
          </Link>
        </DropdownMenuItem>
      )}

      <DropdownMenuItem asChild>
        <Link href="/dashboard/student/profile" className="flex items-center gap-2 cursor-pointer py-1.5 rounded-xl">
          <UserIcon className="w-4 h-4 text-slate-500" /> Profile Settings
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => logoutAction()} className="flex items-center gap-2 cursor-pointer text-red-600 py-1.5 rounded-xl">
        <LogOut className="w-4 h-4" /> Sign Out
      </DropdownMenuItem>
    </>
  );
}
