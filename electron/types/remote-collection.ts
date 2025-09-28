export interface RemoteCollection {
  _id: number;
  title: string;
  description: string;
  user: User;
  public: boolean;
  view: string;
  count: number;
  cover: any[];
  sort: number | null;
  expanded: boolean;
  creatorRef: CreatorRef;
  lastAction: string;
  created: string;
  lastUpdate: string;
  parent: string | null;
  slug: string;
  access: Access;
  author: boolean;
}

export interface Access {
  for: number;
  level: number;
  root: boolean;
  draggable: boolean;
}

export interface CreatorRef {
  _id: number;
  name: string;
  email: string;
}

export interface User {
  $ref: string;
  $id: number;
}
