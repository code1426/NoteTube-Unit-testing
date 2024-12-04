import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import GreetingsBanner from "@/components/Header/GreetingsBanner";
import NoteInputField from "../components/Notes/NoteInputField";
import Header from "@/components/Header/Header";
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

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!loadingUser && user) {
      setShowBanner(true);
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loadingUser, user]);

  const handleAddVideos = async (noteId: string | null, videoList: Video[]) => {
    try {
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      if (!noteId) {
        throw new Error("No note ID found");
      }

      const result = await insertVideos(noteId, videoList);

      result?.map((video, index) =>
        console.log(
          `LINK ${index + 1}: https://www.youtube.com/watch?v=${video.videoId}`,
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

      const summaryResponse = await generateAIResponse<GenerateSummaryResponse>(
        note,
      ).catch((error) => {
        console.error(error);
        throw new Error(error.message);
      });

      if (!summaryResponse) {
        throw new Error("Failed to generate summary");
      }

      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Getting video suggestions...");
      const suggestedVideos = await getVideoSuggestions(
        summaryResponse.content,
      ).then((videos) => videos?.slice(0, 5));

      if (!suggestedVideos) {
        throw new Error("Failed to get video suggestions");
      }
      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Creating note...");
      const result = await createNote({ ...summaryResponse, userId: user.id });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.dismiss(loadingToast);

      handleAddVideos(result.note?.id || null, suggestedVideos);
      toast.success("Note created successfully");
    } catch (error) {
      toast.dismiss();
      toast.error(
        "Error creating note: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
      return;
    }
  };

  if (loadingUser || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster />
      <div className="relative w-full min-h-screen bg-white overflow-auto flex flex-col scrollbar-custom h-screen">
        {showBanner && (
          <div className="fixed top-4 right-11 z-50">
            <GreetingsBanner
              isHomePage={true}
              username={user.username || "Guest"}
            />
          </div>
        )}
        <Header
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
