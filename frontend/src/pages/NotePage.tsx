import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import GeneratedVideoCard from "../components/Notes/GeneratedVideoCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";
import useFetchNote from "@/hooks/Notes/useFetchNote";
import { FullNoteContent } from "@/types/note.types";
import separateNotesWithVideos from "@/utils/notesFormatter";

const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const [displayedNote, setDisplayedNote] = useState<FullNoteContent | null>(
    null,
  );
  const [loadingNote, setLoadingNote] = useState(true);
  const { note, noteLoading, noteError } = useFetchNote(noteId!);

  if (noteError) {
    console.error(noteError);
    toast.error("Error fetching user note.");
  }

  useEffect(() => {
    if (note) {
      setDisplayedNote(separateNotesWithVideos(note)[0]);
      setLoadingNote(false);
    }
  }, [note]);

  if (noteLoading || loadingNote) {
    return <LoadingScreen message="Loading note..." />;
  }

  return (
    <div className="bg-white relative font-secondaryRegular w-full">
      <Header
        isHomepage={false}
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle={displayedNote!.title}
        onAdd={() => {}}
        hasAddButton={false}
      />
      <div className="w-full flex flex-col items-center">
        {/* The div below is for the uploaded notes content */}
        <div className="flex justify-center px-16 py-6 tracking-wider">
          <p>{displayedNote!.content}</p>
        </div>
        {/* The div below is for the generated videos */}
        <div className="w-full flex flex-col justify-center items-center gap-4 py-6">
          {displayedNote!.videos.length === 0 ? (
            <p>No videos found for this note...</p>
          ) : (
            displayedNote!.videos!.map((generatedVideo) => (
              <GeneratedVideoCard
                key={generatedVideo.videoId}
                title={generatedVideo.title}
                thumbnailUrl={generatedVideo.thumbnailUrl}
                videoId={generatedVideo.videoId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
