declare module '*.css' {
  const content: { [key: string]: any };
  export default content;
}

declare module '*.scss' {
  const content: { [key: string]: any };
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // si tenés más variables las declarás acá
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}