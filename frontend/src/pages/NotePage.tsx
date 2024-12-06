import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import GeneratedVideoCard from "../components/Notes/GeneratedVideoCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";
import useFetchNote from "@/hooks/Notes/useFetchNote";

const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const {
    note,
    noteLoading,
    noteError,
    noteVideos,
    videosLoading,
    videosError,
  } = useFetchNote(noteId!);

  if (noteLoading || videosLoading) {
    return <LoadingScreen message="Loading note..." />;
  }

  if (noteError || videosError) {
    if (noteError) {
      console.error(noteError);
    } else {
      console.error(videosError);
    }
    toast.error("Error fetching user note.");
  }

  console.log("Videos: ", noteVideos);

  return (
    <div className="bg-white relative font-secondaryRegular w-full">
      <Header
        isHomepage={false}
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle={"Note Title"}
        onAdd={() => {}}
        hasAddButton={false}
      />
      <div className="w-full flex flex-col items-center">
        {/* The div below is for the uploaded notes content */}
        <div>
          <p>{note!.content}</p>
        </div>
        {/* The div below is for the generated videos */}
        <div className="w-full flex flex-col justify-center items-center gap-4">
          {!noteVideos || noteVideos?.length === 0 ? (
            <p>No videos found for this note...</p>
          ) : (
            noteVideos!.map((generatedVideo) => (
              <GeneratedVideoCard
                key={generatedVideo.videoId}
                url={generatedVideo.thumbnailUrl}
                id={generatedVideo.videoId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
