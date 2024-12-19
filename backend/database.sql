CREATE DATABASE notetube_dev;

-- 1. CREATE EXTENSION TO GENERATE UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE USERS TABLE 
CREATE TABLE IF NOT EXISTS Users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_users_email ON Users(email);
CREATE UNIQUE INDEX idx_users_username ON Users(username);

-- 3. CREATE DECKS TABLE 
CREATE TABLE IF NOT EXISTS Decks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deck_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_decks_user_id ON Decks(user_id);

-- 4. CREATE FLASHCARDS TABLE 
CREATE TABLE IF NOT EXISTS Flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  deck_id UUID REFERENCES Decks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_flashcards_deck_id ON Flashcards(deck_id);

-- 5. CREATE VIDEOS TABLE 
CREATE TABLE IF NOT EXISTS Videos (
  video_id VARCHAR(255) PRIMARY KEY,
  thumbnail_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  note_id UUID REFERENCES Notes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_videos_note_id ON Videos(note_id);

-- 6. CREATE NOTES TABLE 
CREATE TABLE IF NOT EXISTS Notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notes_user_id ON Notes(user_id);

CREATE INDEX idx_notes_user_id_created_at ON Notes(user_id, created_at DESC);
CREATE INDEX idx_flashcards_deck_id_created_at ON Flashcards(deck_id, created_at DESC);