import React, { useState } from "react";
import Header from "../components/Header/Header";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/auth/useUser";
import useFetchUserDecks from "../hooks/Decks/useFetchUserDecks";
import { toast, Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import useFilterDecks from "../hooks/Decks/useFilterDecks";
import { options } from "../types/options.types";
import { DeckEntity } from "../types/deck.types";
import AddDeckDrawer from "../components/Decks/AddDeckDrawer";
import { Drawer } from "@/components/ui/drawer";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverDeckCard from "@/components/Decks/HoverDeckCard";

const UserDecksPage: React.FC = () => {
  const { user, loading: userLoading } = UseUser();
  const {
    userDecks,
    loading: decksLoading,
    error,
  } = useFetchUserDecks(user?.id || "");
  const [isAddDeckDrawerOpen, setIsAddDeckDrawerOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });
  const { filteredDecks, setOptions } = useFilterDecks(
    userDecks,
    filterOptions,
  );

  if (userLoading || !user || decksLoading) {
    return <LoadingScreen message="Loading decks..." />;
  }

  if (error) {
    console.error(error);
    toast.error("Error fetching user decks.");
  }

  const toggleAddDeckDrawer = () => {
    setIsAddDeckDrawerOpen((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setIsAddDeckDrawerOpen(false);
    window.location.reload();
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
      <div className="overflow-auto scrollbar-custom h-screen relative bg-white">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={true}
          sectionTitle="My Decks"
          onAdd={toggleAddDeckDrawer}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />

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
          <div className="p-5">
            <NoItemsContainerBox
              mainText="No decks available"
              subText="Add a deck using the + Add Deck button."
              imageSrc="/src/assets/images/chillguy.png"
              altText="No Cards Available"
            />
          </div>
        ) : (
          <div className="px-3 xs:px-5 sm:px-10 md:px-14 lg:px-20 gap-5 grid xs:grid-cols-1 sm:grid-cols-1 sm-md:grid-cols-1 md:grid-cols-2 md-lg:grid-cols-2 lg:grid-cols-2 lg-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-8 4k:grid-cols-10 xxl:grid-cols-12 auto-cols-auto">
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
                  deckName={deck.deck_name}
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
