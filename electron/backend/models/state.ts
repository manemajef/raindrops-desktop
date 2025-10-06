export interface State {
  isDev: boolean;
  isLogged: boolean;
  user: ActiveUser;
}

export interface ActiveUser {
  id: number;
  token: string;
  credentials: Credentials | null;
  lastSync: Date;
}

export interface Credentials {
  accessToken: string;
  refreshToken: string;
  tokenStart: string;
  tokenEnd: string;
}
