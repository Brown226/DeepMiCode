/// <reference types="vite/client" />

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "@fontsource/geist/400.css";
declare module "@fontsource/geist/500.css";
declare module "@fontsource/geist/600.css";
declare module "@fontsource/geist/700.css";
declare module "@fontsource/geist-mono/400.css";
declare module "@fontsource/geist-mono/500.css";
declare module "@fontsource/geist-mono/600.css";
declare module "@fontsource/inter/400.css";
declare module "@fontsource/inter/500.css";
declare module "@fontsource/inter/600.css";
declare module "@fontsource/inter/700.css";
declare module "katex/dist/katex.min.css";

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string;

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    USERPROFILE?: string;
    HOME?: string;
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
};
