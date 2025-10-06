export interface CollectionRes {
  result: boolean;
  items: CollectionRaw[];
}

export interface CollectionRaw {
  _id: number;
  title: string;
  description: string;
  user: User;
  public: boolean;
  view: string;
  count: number;
  cover: any[];
  sort?: number;
  expanded: boolean;
  creatorRef: CreatorRef;
  lastAction: string;
  created: string;
  lastUpdate: string;
  parent: Parent | null;
  slug: string;
  access: Access;
  author: boolean;
}

export interface User {
  $ref: string;
  $id: number;
}

export interface CreatorRef {
  _id: number;
  name: string;
  email: string;
}

export interface Access {
  for: number;
  level: number;
  root: boolean;
  draggable: boolean;
}
export interface Parent {
  $id: 59250730;
  $ref: "collections";
}
