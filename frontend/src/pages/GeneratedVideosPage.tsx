import Header from "../components/Header/Header";
import useUser from "../hooks/auth/useUser";
import LoadingScreen from "../components/LoadingScreen";
import { NoteWithVideos } from "../types/note.types";
import NoItemsContainerBox from "@/components/NoItemsContainerBox";
import { useContext, useEffect, useState } from "react";
import VideoCard from "@/components/Videos/GeneratedVideo";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotesContext } from "@/context/Contexts";
import { ScrollArea } from "@/components/ui/scroll-area";

const GeneratedVideosPage = () => {
  const { notes } = useContext(NotesContext);

  const { user } = useUser();
  const [displayedNote, setDisplayedNote] = useState<NoteWithVideos | null>(
    null,
  );

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [mobileWidth, setMobileWidth] = useState(720);

  const HandleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  useEffect(() => {
    if (notes) {
      if (notes.length > 0) {
        setDisplayedNote(notes[0] as NoteWithVideos);
        setSelectedVideo(notes[0].videos[notes[0].videos.length - 1].videoId);
      }
      if (isMobile !== null) {
        setMobileWidth(window.outerWidth);
      }
    }
  }, [notes, isMobile]);

  if (!user || !notes) {
    return <LoadingScreen message="Loading generated videos..." />;
  }

  if (!displayedNote) {
    return (
      <div className=" h-screen w-full flex justify-center items-center dark:bg-dark-background">
        <NoItemsContainerBox
          mainText="No Videos From Notes Available"
          subText="Add a note by uploading on the upload page."
          imageSrc="../chillguy.png"
          altText="No Video From Notes Available"
        />
      </div>
    );
  }

  return (
    <div
      id="main-page-screen-div"
      className="bg-white dark:bg-dark-background relative font-secondaryRegular scrollbar-custom flex flex-col items-center w-full gap-4"
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
        className="mt-[-2rem] text-green-700 dark:text-green font-primaryBold text-lg md:text-4xl lg:text-4xl xl:text-4xl py-1 px-8"
      >
        Videos From: {displayedNote!.title}
      </div>
      <div
        id="videos-containers"
        className={`flex flex-col md:flex-row lg:flex-row xl:flex-row gap-8 w-[90%] items-center`}
      >
        <div
          id="current-selected-video-container"
          className={`h-full flex flex-[2] justify-center items-center flex-col`}
        >
          <div
            className={`h-${isMobile ? `[${mobileWidth * 0.8}px]` : "full"} w-${
              isMobile ? `[${mobileWidth}px]` : "full"
            } flex justify-center border-2 rounded-2xl bg-black border-black dark:border-dark-border overflow-hidden`}
            id="main-video-container"
          >
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
        <div
          id="ai-generated-videos"
          className=" my-1 p-2 h-full flex-1 flex w-auto"
        >
          <ScrollArea
            id="videos"
            className="gap-2 h-[calc(100vh-27rem)] md:h-[calc(100vh-18rem)] lg:h-[calc(100vh-18rem)] xl:h-[calc(100vh-18rem)] w-full flex flex-col justify-center"
          >
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default GeneratedVideosPage;
