import React, { useState, useContext } from "react";
import Header from "../components/Header/Header";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import useFilterDecks from "../hooks/Decks/useFilterDecks";
import { options } from "../types/options.types";
import { DeckEntity } from "../types/deck.types";
import AddDeckDrawer from "../components/Decks/AddDeckDrawer";
import AddDeckDialog from "@/components/Decks/AddDeckDialog";
import HoverDeckCard from "@/components/Decks/HoverDeckCard";
import { UserContext, DecksContext } from "@/context/Contexts";
import { useIsMobile } from "@/hooks/use-mobile";

import { Drawer } from "@/components/ui/drawer";
import { Dialog } from "@/components/ui/dialog";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";

const UserDecksPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const { decks: userDecks } = useContext(DecksContext);
  const isMobile = useIsMobile();
  const [isAddDeckDrawerOpen, setIsAddDeckDrawerOpen] = useState(false);
  const [isAddDeckDialogOpen, setIsAddDeckDialogOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });
  const { filteredDecks, setOptions } = useFilterDecks(
    userDecks!,
    filterOptions,
  );

  if (!user || !userDecks) {
    return <LoadingScreen message="Loading decks..." />;
  }

  const toggleAddDeck = () => {
    if (isMobile) setIsAddDeckDrawerOpen((prev) => !prev);
    else setIsAddDeckDialogOpen((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setIsAddDeckDrawerOpen(false);
  };

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions(newOptions);
    setOptions(newOptions);
  };

  const handleSearch = (searchText: string) => {
    setOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  return (
    <>
      <Toaster />
      <div className="overflow-auto pb-4 h-screen w-full relative bg-white flex flex-col items-center scrollbar-custom">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={true}
          sectionTitle="My Decks"
          onAdd={toggleAddDeck}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />

        <Dialog
          open={isAddDeckDialogOpen}
          onOpenChange={setIsAddDeckDialogOpen}
        >
          <AddDeckDialog
            userId={user.id!}
            onClose={() => setIsAddDeckDialogOpen(false)}
            onSuccess={handleFormSuccess}
          />
        </Dialog>

        <Drawer
          open={isAddDeckDrawerOpen}
          onOpenChange={setIsAddDeckDrawerOpen}
        >
          <AddDeckDrawer
            userId={user.id!}
            onClose={() => setIsAddDeckDrawerOpen(false)}
            onSuccess={handleFormSuccess}
          />
        </Drawer>

        {filteredDecks?.length === 0 ? (
          <div className="pt-5">
            <NoItemsContainerBox
              mainText="No decks available"
              subText="Add a deck using the + Add Deck button."
              imageSrc="../chillguy.png"
              altText="No Cards Available"
            />
          </div>
        ) : (
          <div
            className={`w-[90%] gap-4 pb-4 flex flex-col md:grid xs:grid-cols-1 sm:grid-cols-1 sm-md:grid-cols-1 md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-3 lg-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 4k:grid-cols-5 xxl:grid-cols-5 auto-cols-auto`}
          >
            {filteredDecks.map((deck: DeckEntity) => (
              <HoverCard key={deck.id}>
                <HoverCardTrigger>
                  <DeckItem
                    key={deck.id}
                    id={deck.id}
                    deckName={deck.deck_name}
                    cardCount={deck.card_count}
                    userId={deck.user_id}
                    color={deck.color}
                    createdAt={deck.created_at!}
                  />
                </HoverCardTrigger>
                <HoverDeckCard
                  deckName={deck.deck_name!}
                  createdAt={deck.created_at!}
                />
              </HoverCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDecksPage;
