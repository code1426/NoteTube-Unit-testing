import { useState } from "react";
import type { Video } from "../../types/video.types";

const useCreateVideos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVideo = async (
    userId: string,
    noteId: string,
    videodata: Video,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/videos/${userId}`,
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

  const insertVideos = async (
    userId: string,
    noteId: string,
    videodataList: Video[],
  ) => {
    try {
      setLoading(true);
      await Promise.all(
        videodataList.map(async (videoData) => {
          await createVideo(userId, noteId, videoData);
        }),
      );
      return videodataList;
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
