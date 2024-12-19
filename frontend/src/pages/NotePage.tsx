import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";
import useFetchNote from "@/hooks/Notes/useFetchNote";
import SummaryContainer from "@/components/Notes/SummaryContainer";
import VideoCard from "@/components/Notes/VideoCard";

const NotePage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { note, noteLoading, noteError } = useFetchNote(noteId!);

  if (noteError) {
    console.error(noteError);
    toast.error("Error fetching user note.");
  }

  if (noteLoading || !note) {
    return <LoadingScreen message="Loading note..." />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:w-9/12">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={true}
          sectionTitle={note!.title}
          onAdd={() => {}}
          hasAddButton={false}
        />
        <div className="flex-1 flex flex-col items-center px-2 py-4 space-y-4 md:px-4 lg:px-6">
          <SummaryContainer content={note!.content} />
        </div>
      </div>

      <div className="flex flex-col overflow-x-hidden border-2 border-gray-200 dark:border-gray-700 h-auto md:h-screen justify-center items-center w-full md:w-auto px-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 px-5 md:pt-12 my-6">
          Related Videos
        </h2>

        <div className="w-full">
          <div className="md:w-auto w-full overflow-auto">
            <div className="scrollbar-custom overflow-auto flex gap-4 md:flex-col flex-row h-auto md:h-[32rem] w-full md:w-auto">
              {note!.videos.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 italic mx-auto">
                  No videos found for this note...
                </p>
              ) : (
                note!.videos!.map((generatedVideo) => (
                  <div
                    className="max-w-72 flex-shrink-0"
                    key={generatedVideo.videoId}
                  >
                    <VideoCard
                      videoId={generatedVideo.videoId}
                      thumbnailUrl={generatedVideo.thumbnailUrl}
                      title={generatedVideo.title}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
