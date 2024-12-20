import React, { useContext, useEffect, useState } from "react";
import { isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";
import UseUser from "../hooks/auth/useUser";
import Header from "../components/Header/Header";
import LoadingScreen from "../components/LoadingScreen";
import { NoteWithVideos } from "../types/note.types";
import NoItemsContainerBox from "@/components/NoItemsContainerBox";
import NotesHistoryCard from "@/components/History/NotesHistoryCard";
import applySortingAndFilteringToNotes from "@/utils/notesSorterFilter";
import { options } from "@/types/options.types";
import { NotesContext } from "@/context/Contexts";
import { Toaster } from "react-hot-toast";

type GroupedNotes = {
  [key: string]: NoteWithVideos[];
};

const NotesHistoryPage: React.FC = () => {
  const { notes } = useContext(NotesContext);
  const { user } = UseUser();
  const [displayedNotes, setDisplayedNotes] = useState<NoteWithVideos[]>([]);
  const [groupedNotes, setGroupedNotes] = useState<GroupedNotes>({});

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest",
    searchByName: "",
  });

  useEffect(() => {
    if (notes) {
      setDisplayedNotes(notes);
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

  useEffect(() => {
    const grouped = displayedNotes.reduce((acc: GroupedNotes, note) => {
      const date = new Date(note.createdAt);
      let group = "Older";

      if (isToday(date)) {
        group = "Today";
      } else if (isYesterday(date)) {
        group = "Yesterday";
      } else if (isThisWeek(date)) {
        group = "This Week";
      } else if (isThisMonth(date)) {
        group = "This Month";
      }

      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(note);
      return acc;
    }, {});

    setGroupedNotes(grouped);
  }, [displayedNotes]);

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
      <Toaster />
      <div className="relative w-full bg-white dark:bg-dark-background select-none overflow-auto scrollbar-custom h-screen">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={false}
          sectionTitle="Notes History"
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />
        <div className="flex flex-col w-full justify-start items-center mb-8 gap-6 p-4 select-none">
          {Object.keys(groupedNotes).length === 0 ? (
            <div className="p-5">
              <NoItemsContainerBox
                mainText="No Notes Available"
                subText="Add a note by uploading on the upload page."
                imageSrc="../chillguy.png"
                altText="No Notes Available"
              />
            </div>
          ) : (
            Object.entries(groupedNotes).map(([group, notes]) => (
              <div key={group} className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green">
                  {group}
                </h2>
                <div className="space-y-4">
                  {notes.map((note: NoteWithVideos) => (
                    <NotesHistoryCard
                      key={note.id}
                      id={note.id}
                      content={note.content}
                      title={note.title}
                      createdAt={note.createdAt}
                      videos={note.videos}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotesHistoryPage;
