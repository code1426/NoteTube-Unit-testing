import UseUser from "../hooks/auth/useUser";
import Header from "../components/Header/Header";
import LoadingScreen from "../components/LoadingScreen";
import { NoteWithVideos } from "../types/note.types";

import NoItemsContainerBox from "@/components/NoItemsContainerBox";

import { useContext, useEffect, useState } from "react";
import NotesHistoryCard from "@/components/History/NotesHistoryCard";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverHistoryNotesCard from "@/components/History/HoverHistoryNotesCard";
import applySortingAndFilteringToNotes from "@/utils/notesSorterFilter";
import { options } from "@/types/options.types";
import { NotesContext } from "@/context/Contexts";

const NotesHistoryPage = () => {
  const { notes } = useContext(NotesContext);

  const { user } = UseUser();
  const [displayedNotes, setDisplayedNotes] = useState<NoteWithVideos[]>([]);

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });

  useEffect(() => {
    if (notes) {
      setDisplayedNotes(notes);
      console.log(displayedNotes);
    }
  }, [notes]);

  useEffect(() => {
    if (notes) {
      const updatedNotes = applySortingAndFilteringToNotes(
        notes,
        filterOptions,
      );
      setDisplayedNotes(updatedNotes);
    }
  }, [notes, filterOptions]);

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions(newOptions);
  };

  const handleSearch = (searchText: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  if (!user || !notes) {
    return <LoadingScreen message="Loading notes..." />;
  }

  return (
    <>
      <div className="relative w-full bg-white select-none overflow-auto scrollbar-custom h-screen">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={false}
          sectionTitle="Notes History"
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />
        <div className="flex flex-col h-screen w-full justify-start items-center mb-8 gap-8 p-4 select-none">
          {!displayedNotes || displayedNotes?.length === 0 ? (
            <div className="p-5">
              <NoItemsContainerBox
                mainText="No Notes Available"
                subText="Add a note by uploading on the upload page."
                imageSrc="./chillguy.png"
                altText="No Notes Available"
              />
            </div>
          ) : (
            displayedNotes!.map((note: NoteWithVideos) => (
              <HoverCard>
                <HoverCardTrigger>
                  <NotesHistoryCard
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    title={note.title}
                    createdAt={note.createdAt}
                    videos={note.videos}
                  />
                </HoverCardTrigger>
                <HoverHistoryNotesCard
                  title={note.title}
                  createdAt={note.createdAt}
                />
              </HoverCard>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotesHistoryPage;
