import { useState, useEffect } from "react";

import type { Note } from "../../types/note.types";
import { Video } from "@/types/video.types";

interface FetchNoteResult {
  note: Note | null;
  noteLoading: boolean;
  noteError?: string | null;
  noteVideos: Video[] | null;
  videosLoading: boolean;
  videosError?: string | null;
}

const useFetchNote = (noteId: string): FetchNoteResult => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteLoading, setNoteLoading] = useState<boolean>(true);
  const [noteError, setNoteError] = useState<string | null>(null);

  const [noteVideos, setNoteVideos] = useState<Video[] | null>(null);
  const [videosLoading, setVideosLoading] = useState<boolean>(true);
  const [videosError, setVideosError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteResponse = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}`,
          {
            method: "GET",
          },
        );

        if (!noteResponse.ok) {
          const errorData = await noteResponse.json();
          console.log(errorData);
          setNoteError(
            "Request to fetch note failed with status: " + noteResponse.status,
          );
          return;
        } else {
          const data = await noteResponse.json();
          setNote(data);
        }
      } catch (error) {
        setNoteError("Failed to fetch note");
      } finally {
        setNoteLoading(false);
      }

      console.log(note);

      try {
        console.log("Fetching for Note ID: ", noteId);

        const videosResponse = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}/videos`,
          {
            method: "GET",
          },
        );

        if (!videosResponse.ok) {
          const errorData = await videosResponse.json();
          console.log(errorData);
          setVideosError(
            "Request to fetch note videos failed with status: " +
              videosResponse.status,
          );
          return;
        } else {
          const data = await videosResponse.json();
          setNoteVideos(data);
        }
      } catch (error) {
        setVideosError("Failed to fetch videos");
      } finally {
        setVideosLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  return {
    note,
    noteLoading,
    noteError,
    noteVideos,
    videosLoading,
    videosError,
  };
};

export default useFetchNote;
