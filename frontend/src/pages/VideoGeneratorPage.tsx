import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";

const VideoGeneratorPage = () => {
  const noteTitle = "Note Title Sample";

  return (
    <div
      id="main-of-the-mains"
      className="relative bg-white select-none scrollbar-custom h-screen overflow-auto"
    >
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle="Generated Videos"
        hasAddButton={false}
      />
      <div
        id="ai-generated-notes"
        className="border-2 border-red-700 p-4 h-auto w-full"
      >
        <div className="border-4 h-96 mx-52 rounded-2xl"></div>
      </div>
      <div
        id="ai-generated-videos"
        className="border-2 border-blue-700 my-12 p-4 h-auto w-full"
      >
        <div className="border-4 h-auto w-full">
          <div
            id="generated-videos-name"
            className="border-4 border-red-700 font-secondaryRegular text-green text-3xl p-2"
          >
            {noteTitle}
          </div>
          <div
            id="videos"
            className="border-2 border-blue-700 p-2 gap-4 flex flex-row justify-center"
          >
            <div
              id="video-card"
              className="border-2 border-black h-48 w-80 rounded-2xl "
            >
              Video
            </div>
            <div
              id="video-card"
              className="border-2 border-black h-48 w-80 rounded-2xl "
            >
              Video
            </div>
            <div
              id="video-card"
              className="border-2 border-black h-48 w-80 rounded-2xl "
            >
              Video
            </div>
            <div
              id="video-card"
              className="border-2 border-black h-48 w-80 rounded-2xl "
            >
              Video
            </div>
            <div
              id="video-card"
              className="border-2 border-black h-48 w-80 rounded-2xl "
            >
              Video
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneratorPage;
