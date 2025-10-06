export interface RaindropRes {
  result: boolean;
  items: RaindropRaw[];
  count: number;
  collectionId: number;
}

export interface RaindropRaw {
  _id: number;
  link: string;
  title: string;
  excerpt: string;
  note: string;
  type: string;
  user: User;
  cover: string;
  media: Medum[];
  tags: string[];
  important: boolean;
  reminder?: Reminder;
  removed: boolean;
  created: string;
  collection: Collection;
  highlights: any[];
  lastUpdate: string;
  domain: string;
  creatorRef: CreatorRef;
  sort: number;
  cache: Cache;
  broken: boolean;
  collectionId: number;
}

export interface User {
  $ref: string;
  $id: number;
}

export interface Medum {
  type: string;
  link: string;
}

export interface Reminder {
  date: any;
}

export interface Collection {
  $ref: string;
  $id: number;
  oid: number;
}

export interface CreatorRef {
  _id: number;
  avatar: string;
  name: string;
  email: string;
}

export interface Cache {
  status: string;
  created?: string;
  size?: number;
  retries?: number;
  retryAfter?: string;
}
