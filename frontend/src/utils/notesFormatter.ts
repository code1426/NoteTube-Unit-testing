import { FetchedNoteWithVideos, NoteWithVideos } from "@/types/note.types";
import { Video } from "@/types/video.types";

const separateNotesWithVideos = (
  fetchedData: FetchedNoteWithVideos[],
): NoteWithVideos[] => {
  if (!fetchedData) {
    return [];
  }

  const containsVideo = (videoId: string, videos: Video[]): boolean => {
    return videos.some((video) => video.videoId === videoId);
  };

  const newData: NoteWithVideos[] = [];

  console.log(fetchedData);

  for (const data of fetchedData) {
    // Skip entries without valid videoId or noteId
    if (!data.id || !data.title || !data.content || !data.created_at) {
      console.warn("Skipping invalid entry:", data);
      continue;
    }

    const existingNote = newData.find((note) => note.id === data.id);

    if (existingNote) {
      // Only add videos if they are valid and unique
      if (
        data.video_id &&
        data.thumbnail_url &&
        !containsVideo(data.video_id, existingNote.videos)
      ) {
        existingNote.videos.push({
          videoId: data.video_id,
          title: data.video_title,
          thumbnailUrl: data.thumbnail_url,
        });
      }
    } else {
      // Create a new note
      newData.push({
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: data.created_at,
        videos:
          data.video_id && data.thumbnail_url
            ? [
                {
                  videoId: data.video_id,
                  title: data.video_title,
                  thumbnailUrl: data.thumbnail_url,
                },
              ]
            : [],
      });
    }
  }

  return newData;
};

export default separateNotesWithVideos;
