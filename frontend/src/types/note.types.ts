import { Video } from "./video.types";

export interface CreateNoteData {
  title: string;
  content: string;
  userId: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface FetchedNote {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export interface FetchedNoteWithVideos {
  id: string;
  title: string;
  content: string;
  created_at: string;
  video_title: string;
  video_id: string;
  thumbnail_url: string;
}

export interface NoteWithVideos {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  videos: Video[];
}
