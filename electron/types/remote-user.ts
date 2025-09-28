export interface User {
  _id: number;
  config: Config;
  dropbox: Dropbox;
  email: string;
  email_MD5: string;
  files: Files;
  fullName: string;
  gdrive: Dropbox;
  groups: Group[];
  password: boolean;
  pro: boolean;
  proExpire: Date;
  registered: Date;
}

export interface Config {
  broken_level: string;
  font_color: string;
  font_size: number;
  lang: string;
  last_collection: number;
  raindrops_sort: string;
  raindrops_view: string;
}

export interface Dropbox {
  enabled: boolean;
}

export interface Files {
  used: number;
  size: number;
  lastCheckPoint: string;
}

export interface Group {
  title: string;
  hidden: boolean;
  sort: number;
  collections: number[];
}
