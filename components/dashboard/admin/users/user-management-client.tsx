"use client";

import { useState, useTransition, useMemo } from "react";
import { Role } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toggleUserStatusAction, changeUserRoleAction } from "@/actions/admin.actions";
import { UserStatsCards } from "./user-stats-cards";
import { UserSearchFilter } from "./user-search-filter";
import { UserTableView } from "./user-table-view";
import { UserDetailsModal, type ModalUserData } from "./user-details-modal";

interface UserManagementClientProps {
  initialUsers: ModalUserData[];
}

export function UserManagementClient({ initialUsers }: UserManagementClientProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | Role>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [selectedUser, setSelectedUser] = useState<ModalUserData | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (id: string) => {
    startTransition(async () => {
      const res = await toggleUserStatusAction(id);
      if (res.success) { toast.success(res.message); router.refresh(); }
      else toast.error(res.message);
    });
  };

  const handleRole = (id: string, role: Role) => {
    startTransition(async () => {
      const res = await changeUserRoleAction(id, role);
      if (res.success) { toast.success(res.message); router.refresh(); }
      else toast.error(res.message);
    });
  };

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((u) => {
      const q = search.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department && u.department.toLowerCase().includes(q)) ||
        (u.rollNo && u.rollNo.toLowerCase().includes(q));

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && u.isActive) ||
        (statusFilter === "INACTIVE" && !u.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [initialUsers, search, roleFilter, statusFilter]);

  return (
    <div className="space-y-4">
      <UserStatsCards users={initialUsers} />
      <UserSearchFilter
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <UserTableView
        users={filteredUsers}
        isPending={isPending}
        onToggleStatus={handleToggle}
        onRoleChange={handleRole}
        onViewDetails={setSelectedUser}
      />
      <UserDetailsModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
