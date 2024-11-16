import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Deck from "../components/MyDecks/Deck";
import useFetchDecks from "../hooks/useFetchDecks";
import { Deck as DeckType } from "../types/deck.types";

function MyDeck() {
  const { decks, loading } = useFetchDecks();

  if (loading) return <p>Loading decks...</p>;

  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        sectionTitle="My Decks"
      />
      <div className="w-screen flex px-20 gap-5">
        {decks.map((deck: DeckType) => (
          <Deck
            key={deck.id}
            id={deck.id}
            deck_name={deck.deck_name}
            card_count={deck.card_count}
          />
        ))}
      </div>
    </div>
  );
}

export default MyDeck;
