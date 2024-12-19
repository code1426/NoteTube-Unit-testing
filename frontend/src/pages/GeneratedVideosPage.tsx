import Header from "../components/Header/Header";
import UseUser from "../hooks/auth/useUser";
import LoadingScreen from "../components/LoadingScreen";
import { NoteWithVideos } from "../types/note.types";
import NoItemsContainerBox from "@/components/NoItemsContainerBox";
import { useContext, useEffect, useState } from "react";
import VideoCard from "@/components/Videos/GeneratedVideo";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotesContext } from "@/context/Contexts";

const GeneratedVideosPage = () => {
  const { notes } = useContext(NotesContext);

  const { user } = UseUser();
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
        setSelectedVideo(notes[0].videos[0].videoId);
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
      <div className=" h-screen w-full flex justify-center items-center">
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
      className="bg-white relative font-secondaryRegular scrollbar-custom flex flex-col items-center w-full gap-4"
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
        className="mt-[-2rem] text-green-700 font-primaryBold text-lg md:text-3xl lg:text-3xl xl:text-3xl py-1 px-8"
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
            } flex justify-center border-2 rounded-2xl bg-black border-black overflow-hidden`}
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
          <div className="h-auto w-full">
            <div id="videos" className="gap-2 flex flex-col justify-center">
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
