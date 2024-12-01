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
