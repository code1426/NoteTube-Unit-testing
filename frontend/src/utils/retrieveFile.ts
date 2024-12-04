import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const retrieveFile = async (path: string): Promise<string | null> => {
  try {
    const { data } = supabase.storage
      .from(import.meta.env.VITE_STORAGE_BUCKET)
      .getPublicUrl(`${path}`);

    if (!data) {
      throw new Error("File not found");
    }

    const publicUrl = data.publicUrl;

    if (publicUrl === null) {
      throw new Error("Can't retrieve public URL");
    }

    return publicUrl;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export default retrieveFile;
