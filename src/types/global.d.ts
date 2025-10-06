// electron/global.d.ts or src/global.d.ts

export {};

declare global {
  interface Window {
    ipcRenderer: {
      on: (...args: any[]) => void;
      off: (...args: any[]) => void;
      send: (...args: any[]) => void;
      invoke: (...args: any[]) => Promise<any>;
    };
    api: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
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
