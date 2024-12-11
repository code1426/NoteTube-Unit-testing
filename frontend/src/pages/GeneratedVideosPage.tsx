import Header from "../components/Header/Header";
import UseUser from "../hooks/auth/useUser";
import LoadingScreen from "../components/LoadingScreen";
import { FullNoteContent } from "../types/note.types";
import useFetchNotes from "@/hooks/Notes/useFetchNotes";
import NoItemsContainerBox from "@/components/NoItemsContainerBox";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import separateNotesWithVideos from "@/utils/notesFormatter";
import VideoCard from "@/components/Videos/GeneratedVideo";

const GeneratedVideosPage = () => {
  const { user, loading: userLoading } = UseUser();
  const [displayedNote, setDisplayedNote] = useState<FullNoteContent | null>(
    null,
  );
  const [loadingNote, setLoadingNote] = useState(true);
  const { notes, loading, error } = useFetchNotes(user?.id || "");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const HandleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  if (error) {
    console.error(error);
    toast.error("Error fetching user notes.");
  }

  useEffect(() => {
    if (notes) {
      setDisplayedNote(separateNotesWithVideos(notes)[0]);
      setLoadingNote(false);
      if (displayedNote) {
        setSelectedVideo(displayedNote!.videos[0].videoId);
      }
      console.log(displayedNote);
    }
  }, [notes]);

  if (userLoading || !user || loading || loadingNote) {
    return <LoadingScreen message="Loading notes..." />;
  }

  if (!displayedNote) {
    return (
      <div className=" h-screen w-full flex justify-center items-center">
        z
        <NoItemsContainerBox
          mainText="No Videos From Notes Available"
          subText="Add a note by uploading on the upload page."
          imageSrc="/src/assets/images/chillguy.png"
          altText="No Video From Notes Available"
        />
      </div>
    );
  }

  return (
    <div
      id="main-of-the-mains"
      className="bg-white relative font-secondaryRegular w-full"
    >
      <Header
        isHomepage={false}
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle="Generated Videos"
        hasAddButton={false}
      />
      <div
        id="ai-generated-notes"
        className=" p-4 h-auto w-full flex justify-center flex-col"
      >
        <div className="flex justify-center">
          <div className="border-4 h-[36rem] w-[52rem] rounded-2xl flex justify-center bg-black">
            <iframe
              className="w-[98%] h-[100%]"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
      <div id="ai-generated-videos" className=" my-2 p-4 h-auto w-full">
        <div className="border-4 border-gray-300 h-auto w-full">
          <div
            id="generated-videos-name"
            className=" font-secondaryRegular text-green text-3xl p-2"
          >
            Videos From: {displayedNote!.title}
          </div>
          <div id="videos" className=" p-2 gap-8 flex flex-row justify-center">
            {displayedNote.videos.map((video, index) => (
              <VideoCard
                key={index}
                videoId={video.videoId}
                thumbnailUrl={video.thumbnailUrl}
                onClickFunction={HandleVideoSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedVideosPage;
