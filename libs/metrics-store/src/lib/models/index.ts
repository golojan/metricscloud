import { Models } from "@rematch/core";

import { settings } from "./settings";
import { schools } from "./schools";

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  schools: typeof schools;
}

export const models: RootModel = {
  settings,
  schools,
};
