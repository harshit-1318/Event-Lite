import { requireAuth } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { ProfileForm } from "@/components/dashboard/student";
import { UserCheck } from "lucide-react";

export default async function StudentProfilePage() {
  const sessionUser = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold">
          <UserCheck className="w-3.5 h-3.5" /> Student Account
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-xs text-slate-500">Update your academic roll number, department, and contact details.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
