import type { State } from "electron/backend/models/state";
import type { UserSelect } from "electron/backend/models/user";
import type { RaindropSelect } from "electron/backend/models/raindrop";
import type { CollectionSelect } from "electron/backend/models/collection";

export type User = UserSelect;
export type Raindrop = RaindropSelect;
export type Collection = CollectionSelect;
export type AppState = State;
