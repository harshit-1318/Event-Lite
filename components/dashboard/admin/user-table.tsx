import { UserManagementClient } from "./users/user-management-client";
import { type ModalUserData } from "./users/user-details-modal";

export interface UserTableProps {
  users: ModalUserData[];
}

export function UserTable({ users }: UserTableProps) {
  return <UserManagementClient initialUsers={users} />;
}
