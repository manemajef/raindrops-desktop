export interface State {
  isDev: boolean;
  isLogged: boolean;
  user: ActiveUser;
}

interface ActiveUser {
  id: number;
  token: string;
  credentials: Credentials | null;
  lastSync: Date;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
  tokenStart: string;
  tokenEnd: string;
}
