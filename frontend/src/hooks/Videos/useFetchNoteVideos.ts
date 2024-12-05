import { useState, useEffect } from "react";

import type { Video } from "../../types/video.types";

interface FetchNoteVideosResult {
  noteVideos: Video[] | null;
  videosLoading: boolean;
  error?: string | null;
}

const useFetchNoteVideos = (noteId: string): FetchNoteVideosResult => {
  const [noteVideos, setVideos] = useState<Video[] | null>(null);
  const [videosLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoteVideos = async () => {
      if (!noteId) {
        setLoading(false);
        setError("No note ID provided");
        return;
      }

      console.log("fetching videos for note: ", noteId);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}/videos`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          setError(
            "Request to fetch note videos failed with status: " +
              response.status,
          );
          return;
        } else {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        setError("Failed to fetch note videos");
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchNoteVideos();
    }
  }, [noteId]);

  return { noteVideos, videosLoading, error };
};

export default useFetchNoteVideos;
