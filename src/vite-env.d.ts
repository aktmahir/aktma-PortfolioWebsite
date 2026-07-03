/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      VITE_GA_ID?: string;
    }
  }
}

export {};