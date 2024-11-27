export interface Deck {
  id: string;
  deck_name: string;
  user_id: string;
  card_count?: number;
  created_at?: Date;
}
