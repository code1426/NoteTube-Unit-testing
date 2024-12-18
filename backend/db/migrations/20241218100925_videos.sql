-- migrate:up
CREATE TABLE IF NOT EXISTS Videos (
  video_id VARCHAR(255) PRIMARY KEY,
  thumbnail_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  note_id UUID REFERENCES Notes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE Videos
