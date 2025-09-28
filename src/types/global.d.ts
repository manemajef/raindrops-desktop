export {};
declare global {
  interface Window {
    authApi: {
      authenticate: () => Promise<any>;
      refresh: () => Promise<any>;
      verify: () => Promise<any>;
      query: () => Promise<any>;
    };
    sync: {
      sync: () => Promise<any>;
      resync: () => Promise<any>;
    };
  }
}
