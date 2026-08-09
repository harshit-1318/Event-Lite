"use server";

import * as create from "./events/create.action";
import * as update from "./events/update.action";
import * as del from "./events/delete.action";
import * as direct from "./events/direct-register.action";

export async function createEventAction(...args: Parameters<typeof create.createEventAction>) {
  return create.createEventAction(...args);
}

export async function updateEventAction(...args: Parameters<typeof update.updateEventAction>) {
  return update.updateEventAction(...args);
}

export async function deleteEventAction(...args: Parameters<typeof del.deleteEventAction>) {
  return del.deleteEventAction(...args);
}

export async function directRegisterAction(...args: Parameters<typeof direct.directRegisterAction>) {
  return direct.directRegisterAction(...args);
}
