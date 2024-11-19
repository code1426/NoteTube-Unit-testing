-- migrate:up
CREATE TABLE IF NOT EXISTS Cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_front TEXT NOT NULL,
  card_back TEXT NOT NULL,
  deck_id UUID REFERENCES Decks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE Cards
