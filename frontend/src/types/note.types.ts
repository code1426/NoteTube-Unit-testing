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

export interface FetchedNotesFormat {
  id: string;
  title: string;
  content: string;
  created_at: string;
  video_id: string;
  thumbnail_url: string;
}

export interface FullNoteContent {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  videos: Video[];
}
