import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { DirectRegisterForm } from "@/components/dashboard/faculty";
import { UserPlus } from "lucide-react";

export default async function FacultyRegisterStudentPage() {
  const user = await requireFacultyOrAdmin();

  const events = await prisma.event.findMany({
    where: { organizerId: user.id, status: "PUBLISHED" },
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-purple-600 font-semibold">
          <UserPlus className="w-3.5 h-3.5" /> Department Enrollment
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Direct Student Registration</h1>
        <p className="text-xs text-slate-500">Manually register and approve a student using their roll number or email.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <DirectRegisterForm events={events} />
      </div>
    </div>
  );
}
