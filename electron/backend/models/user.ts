export interface UserRes {
  result: boolean;
  user: UserRaw;
}

export interface UserRaw {
  tfa: Tfa;
  files: Files;
  _id: number;
  fullName: string;
  email: string;
  avatar: string;
  provider: string;
  google: Google;
  pro: boolean;
  groups: Group[];
  lastAction: string;
  lastVisit: string;
  name: string;
  registered: string;
  lastUpdate: string;
  config: Config;
  apple: Apple;
}

export interface Tfa {
  enabled: boolean;
}

export interface Files {
  size: number;
  lastCheckPoint: string;
  used: number;
}

export interface Google {
  enabled: boolean;
}

export interface Group {
  title: string;
  hidden: boolean;
  sort: number;
  collections: number[];
}

export interface Config {
  default_collection_view: string;
  raindrops_hide: string[];
  raindrops_buttons: string[];
  raindrops_search_by_score: boolean;
  raindrops_search_incollection: boolean;
  broken_level: string;
  font_size: number;
  nested_view_legacy: boolean;
  add_default_collection: number;
  acknowledge: any[];
  ai_suggestions: boolean;
  last_collection: number;
  raindrops_grid_cover_size: number;
  raindrops_list_cover_right: boolean;
  filters_hide: boolean;
  tags_hide: boolean;
  tags_sort: string;
  raindrops_sort: string;
}

export interface Apple {
  enabled: boolean;
}
