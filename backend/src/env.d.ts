declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL?: string;
    readonly GEMINI_API_KEY?: string;
    readonly MEMORY_STORAGE_FOLDER?: string;
  }
}
