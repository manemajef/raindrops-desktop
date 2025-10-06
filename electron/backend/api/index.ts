import { ipcMain } from "electron";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  getAllCollections,
  getAllRaindrops,
  onStartUp,
  syncAllData,
} from "./startup";

ipcMain.handle("api:getCurrentUser", async () => await getCurrentUser());
ipcMain.handle(
  "api:loginUser",
  async (_, token: string) => await loginUser(token)
);
ipcMain.handle("api:logoutUser", async () => await logoutUser());
ipcMain.handle(
  "api:getAllCollections",
  async (_, userId: number) => await getAllCollections(userId)
);
ipcMain.handle(
  "api:getAllRaindrops",
  async (_, userId: number) => await getAllRaindrops(userId)
);
ipcMain.handle("api:startup", async () => await onStartUp());
ipcMain.handle("api:syncAllData", async () => await syncAllData());
