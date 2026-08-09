"use server";

import * as users from "./admin/users.action";
import * as cats from "./admin/categories.action";

export async function toggleUserStatusAction(...args: Parameters<typeof users.toggleUserStatusAction>) {
  return users.toggleUserStatusAction(...args);
}

export async function changeUserRoleAction(...args: Parameters<typeof users.changeUserRoleAction>) {
  return users.changeUserRoleAction(...args);
}

export async function createCategoryAction(...args: Parameters<typeof cats.createCategoryAction>) {
  return cats.createCategoryAction(...args);
}

export async function deleteCategoryAction(...args: Parameters<typeof cats.deleteCategoryAction>) {
  return cats.deleteCategoryAction(...args);
}
