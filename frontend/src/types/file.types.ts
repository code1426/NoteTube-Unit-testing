export interface FileData {
  name: string;
  contentType: string;
  publicUrl: string;
}

export interface UploadResponse {
  data: File | null;
  error: Error | null;
}
