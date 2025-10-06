import fs from "fs";
import path from "path";
import type { State } from "../models/state";
// const isDev = true;
const basePath = path.join(process.cwd(), "data");
const statePath = path.join(basePath, "state.json");
export function loadState(): State {
  if (!fs.existsSync(statePath)) {
    const ghost: State = {
      isDev: !app.isPackaged,
      isLogged: false,
      user: null as any,
    };
    fs.writeFileSync(statePath, JSON.stringify(ghost, null, 2));
    return ghost;
  }
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}
export function saveState(state: State) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}
