-- migrate:up
CREATE TABLE IF NOT EXISTS Decks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deck_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE Decks
