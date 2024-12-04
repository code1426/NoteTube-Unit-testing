import { FileData, UploadResponse } from "@/types/file.types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const uploadFile = async (
  file: File,
  userId: string,
): Promise<FileData | null> => {
  try {
    const { data, error } = (await supabase.storage
      .from(import.meta.env.VITE_STORAGE_BUCKET)
      .upload(`${userId}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      })) as UploadResponse;

    if (error) {
      throw new Error(error.message);
    }

    const fileResponse = data;

    if (fileResponse === null) {
      return null;
    }

    return fileResponse;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export default uploadFile;
