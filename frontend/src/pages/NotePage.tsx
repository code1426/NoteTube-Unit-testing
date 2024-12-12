import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";
import useFetchNote from "@/hooks/Notes/useFetchNote";
import { FullNoteContent } from "@/types/note.types";
import separateNotesWithVideos from "@/utils/notesFormatter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SummaryContainer from "@/components/Notes/SummaryContainer";
import VideoCard from "@/components/Notes/VideoCard";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverVideoCard from "@/components/Notes/HoverVideoCard";

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
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <Header
        isHomepage={false}
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle={displayedNote!.title}
        onAdd={() => {}}
        hasAddButton={false}
      />
      <div className="flex-1 flex flex-col items-center px-2 py-4 space-y-4 md:px-4 lg:px-6">
        <SummaryContainer content={displayedNote!.content} />
      </div>

      <div className="mt-auto overflow-x-hidden w-full">
        <h2 className="text-xl font-semibold text-gray-800 px-5 py-3">
          Related Videos
        </h2>

        <ScrollArea className="pb-4">
          <div className="flex space-x-4 px-5">
            {displayedNote!.videos.length === 0 ? (
              <p className="text-gray-500 italic mx-auto">
                No videos found for this note...
              </p>
            ) : (
              displayedNote!.videos!.map((generatedVideo) => (
                <div
                  className="max-w-[280px] w-full flex-shrink-0"
                  key={generatedVideo.videoId}
                >
                  <HoverCard>
                    <HoverCardTrigger>
                      <VideoCard
                        videoId={generatedVideo.videoId}
                        thumbnailUrl={generatedVideo.thumbnailUrl}
                        title={generatedVideo.title}
                      />
                    </HoverCardTrigger>
                    <HoverVideoCard title={generatedVideo.title} />
                  </HoverCard>
                </div>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default NotePage;
