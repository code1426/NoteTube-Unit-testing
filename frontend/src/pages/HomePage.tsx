import toast, { Toaster } from "react-hot-toast";

import Header from "../components/Header/Header";
import NoteInputField from "../components/Notes/NoteInputField";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";

import type {
  GenerateAIResponseProps,
  GenerateSummaryResponse,
} from "../types/ai.types";

import useUser from "../hooks/auth/useUser";
import useCreateNote from "../hooks/Notes/useCreateNote";
import useCreateVideos from "../hooks/Videos/useCreateVideo";

import generateAIResponse from "../utils/generateAIResponse";
import getVideoSuggestions from "../utils/getVideoSuggestions";
import { Video } from "../types/video.types";

const HomePage = () => {
  const { user, loading: loadingUser } = useUser();
  const { createNote } = useCreateNote();
  const { insertVideos } = useCreateVideos();

  const handleAddVideos = async (noteId: string | null, videoList: Video[]) => {
    try {
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      if (!noteId) {
        throw new Error("No note ID found");
      }

      const result = await insertVideos(user.id, noteId, videoList);

      result?.map((video, index) =>
        console.log(
          `LINK ${index}: https://www.youtube.com/watch?v=${video.videoId}`,
        ),
      );
    } catch (error) {
      toast.error("Error adding videos: " + error);
      return;
    }
  };

  const handleAddNote = async (
    note: GenerateAIResponseProps,
  ): Promise<void> => {
    let loadingToast: string;

    try {
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      loadingToast = toast.loading("Generating summary...");

      const summaryResponse =
        await generateAIResponse<GenerateSummaryResponse>(note);

      if (!summaryResponse) {
        throw new Error("Failed to generate summary");
      }
      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Getting video suggestions...");
      const suggestedVideos = await getVideoSuggestions(summaryResponse.title);

      if (!suggestedVideos) {
        throw new Error("Failed to get video suggestions");
      }
      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Creating note...");
      const result = await createNote({ ...summaryResponse, userId: user.id });

      if (result.error) {
        throw new Error(result.error);
      }

      handleAddVideos(result.note?.id || null, suggestedVideos);
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating note: " + error);
      return;
    } finally {
      toast.dismiss();
      toast.success("Note created successfully");
    }
  };

  if (loadingUser || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster />
      <div className="relative w-full min-h-screen bg-white overflow-auto flex flex-col scrollbar-custom h-screen">
        <Header isHomePage={true} username={user.username} />
        <SubHeader
          isFlashCardsPage={false}
          isSectionTitleOnly={true}
          hasAddButton={false}
          sectionTitle="Upload Notes"
        />
        <NoteInputField onSubmit={handleAddNote} />
      </div>
    </>
  );
};

export default HomePage;
