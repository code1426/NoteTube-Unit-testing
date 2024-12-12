import UseUser from "../hooks/auth/useUser";
import Header from "../components/Header/Header";
import LoadingScreen from "../components/LoadingScreen";
import { FullNoteContent } from "../types/note.types";
import useFetchNotes from "@/hooks/Notes/useFetchNotes";
import NoItemsContainerBox from "@/components/NoItemsContainerBox";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import separateNotesWithVideos from "@/utils/notesFormatter";
import NotesHistoryCard from "@/components/History/NotesHistoryCard";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverHistoryNotesCard from "@/components/History/HoverHistoryNotesCard";
import applySortingAndFilteringToNotes from "@/utils/notesSorterFilter";
import { options } from "@/types/options.types";

const NotesHistoryPage = () => {
  const { user, loading: userLoading } = UseUser();
  const [displayedNotes, setDisplayedNotes] = useState<FullNoteContent[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const { notes, loading, error } = useFetchNotes(user?.id || "");

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });

  if (error) {
    console.error(error);
    toast.error("Error fetching user notes.");
  }

  useEffect(() => {
    if (notes) {
      setDisplayedNotes(separateNotesWithVideos(notes));
      setLoadingNotes(false);
      console.log(displayedNotes);
    }
  }, [notes]);

  useEffect(() => {
    if (notes) {
      const updatedNotes = applySortingAndFilteringToNotes(
        separateNotesWithVideos(notes),
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

  if (userLoading || !user || loading || loadingNotes) {
    return <LoadingScreen message="Loading notes..." />;
  }

  return (
    <>
      <Toaster />
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
                imageSrc="/src/assets/images/chillguy.png"
                altText="No Notes Available"
              />
            </div>
          ) : (
            displayedNotes!.map((note: FullNoteContent) => (
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
