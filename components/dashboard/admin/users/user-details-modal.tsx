import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Role } from "@prisma/client";
import { User, Mail, Phone, BookOpen, GraduationCap, Building2, Calendar, Shield } from "lucide-react";

export interface ModalUserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  rollNo?: string | null;
  studentClass?: string | null;
  department?: string | null;
  fatherName?: string | null;
  isActive: boolean;
  createdAt: Date | string;
}

interface UserDetailsModalProps {
  user: ModalUserData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  const details = [
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Phone", value: user.phone || "Not provided", icon: Phone },
    { label: "Roll Number", value: user.rollNo || "N/A", icon: GraduationCap },
    { label: "Class / Semester", value: user.studentClass || "N/A", icon: BookOpen },
    { label: "Department", value: user.department || "General", icon: Building2 },
    { label: "Father's Name", value: user.fatherName || "Not provided", icon: User },
    { label: "Joined Date", value: new Date(user.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" }), icon: Calendar },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">{user.name}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400">User Identity & Profile Details</DialogDescription>
              </div>
            </div>
            <Badge variant={user.isActive ? "default" : "destructive"} className="text-[10px]">
              {user.isActive ? "ACTIVE" : "INACTIVE"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 flex items-center gap-1"><Icon className="w-3 h-3 text-blue-500" /> {item.label}</span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{item.value}</p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
