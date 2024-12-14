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
import { useIsMobile } from "@/hooks/use-mobile";

const GeneratedVideosPage = () => {
  const { user, loading: userLoading } = UseUser();
  const [displayedNote, setDisplayedNote] = useState<FullNoteContent | null>(
    null,
  );
  const [loadingNote, setLoadingNote] = useState(true);
  const { notes, loading, error } = useFetchNotes(user?.id || "");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [mobileWidth, setMobileWidth] = useState(720);

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
      if (isMobile) {
        setMobileWidth(window.outerWidth);
        console.log(window.outerWidth);
      }
    }
  }, [notes, isMobile]);

  if (userLoading || !user || loading || loadingNote) {
    return <LoadingScreen message="Loading generated videos..." />;
  }

  if (!displayedNote) {
    return (
      <div className=" h-screen w-full flex justify-center items-center">
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
      id="main-page-screen-div"
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
        id="generated-videos-name"
        className=" font-secondaryRegular text-green text-3xl py-1 px-8"
      >
        Videos From: {displayedNote!.title}
      </div>
      <div
        id="videos-containers"
        className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center w-[96%]`}
      >
        <div
          id="current-selected-video"
          className=" p-4 h-auto w-auto flex justify-center flex-col"
        >
          <div
            className={`h-[${isMobile ? `${mobileWidth * 0.8}px` : "32rem"}] w-[${isMobile ? `${mobileWidth}px` : "48rem"}] flex justify-center`}
            id="main-video-container"
          >
            <div
              className={`h-full w-full border-4 rounded-2xl flex justify-center bg-black border-black`}
            >
              <iframe
                className="w-[100%] h-[100%]"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
        <div id="ai-generated-videos" className=" my-1 p-2 h-full w-auto">
          <div className="h-auto w-full">
            <div id="videos" className="gap-4 flex flex-col justify-center">
              {displayedNote.videos.map((video) =>
                video.videoId != selectedVideo ? (
                  <VideoCard
                    key={video.videoId}
                    videoId={video.videoId}
                    thumbnailUrl={video.thumbnailUrl}
                    title={video.title}
                    onClickFunction={HandleVideoSelect}
                  />
                ) : (
                  <></>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedVideosPage;
