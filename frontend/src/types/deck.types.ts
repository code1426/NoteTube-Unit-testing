export interface DeckEntity {
  id: string;
  deck_name: string;
  user_id: string;
  card_count?: number;
  created_at?: string;
}

export interface Deck {
  id: string;
  deckName: string;
  userId: string;
  cardCount?: number;
  createdAt?: string;
}
