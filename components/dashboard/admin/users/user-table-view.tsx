import { Role } from "@prisma/client";
import { UserTableRow } from "./user-table-row";
import { ModalUserData } from "./user-details-modal";

interface UserTableViewProps {
  users: ModalUserData[];
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onRoleChange: (id: string, role: Role) => void;
  onViewDetails: (user: ModalUserData) => void;
}

export function UserTableView({
  users,
  isPending,
  onToggleStatus,
  onRoleChange,
  onViewDetails,
}: UserTableViewProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-xs text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="p-3.5">User Identity</th>
            <th className="p-3.5">Access Role</th>
            <th className="p-3.5">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-400">
                No user accounts found matching your filters.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <UserTableRow
                key={u.id}
                user={u}
                isPending={isPending}
                onToggleStatus={onToggleStatus}
                onRoleChange={onRoleChange}
                onViewDetails={onViewDetails}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
