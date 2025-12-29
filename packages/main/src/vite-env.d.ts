/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_JS_PATH: string;
  readonly VITE_REACT_DOM_JS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
