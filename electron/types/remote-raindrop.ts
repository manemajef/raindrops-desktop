export interface RemoteRaindrop {
  _id: number;
  link: string;
  title: string;
  excerpt: string;
  note: string;
  type: string;
  user: User;
  cover: string;
  media: string[];
  tags: string[];
  highlights: any[];
  important: boolean;
  removed: boolean;
  created: string;
  collection: Collection;
  lastUpdate: string;
  domain: string;
  creatorRef: CreatorRef;
  sort: number;
  collectionId: number;
  reminder?: any;
}

export interface Collection {
  $ref: string;
  $id: number;
  oid: number;
}

export interface CreatorRef {
  _id: number;
  avatar?: string;
  name: string;
  email?: string;
}

export interface User {
  $ref: string;
  $id: number;
}
