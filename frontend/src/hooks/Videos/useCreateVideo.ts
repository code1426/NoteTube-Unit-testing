import { useState } from "react";
import type { Video } from "../../types/video.types";

const useCreateVideos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVideo = async (noteId: string, videodata: Video) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/videos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...videodata, noteId: noteId }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        setError(error);
        return;
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the video.");
    }
  };

  const insertVideos = async (noteId: string, videoDataList: Video[]) => {
    try {
      setLoading(true);
      await Promise.all(
        videoDataList.map(async (videoData) => {
          await createVideo(noteId, videoData);
        }),
      );
      return videoDataList;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { insertVideos, loading, error };
};

export default useCreateVideos;
