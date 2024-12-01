import toast, { Toaster } from "react-hot-toast";

import Header from "../components/Header/Header";
import NoteInputField from "../components/Notes/NoteInputField";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";

import useUser from "../hooks/auth/useUser";
import generateAIResponse from "../utils/generateAIResponse";

import type {
  GenerateAIResponseProps,
  GenerateSummaryResponse,
} from "../types/ai.types";
import useCreateNote from "../hooks/Notes/useCreateNote";

const HomePage = () => {
  const { user, loading: loadingUser } = useUser();
  const { createNote } = useCreateNote();

  const handleAddNote = async (
    note: GenerateAIResponseProps,
  ): Promise<void> => {
    let loadingToast: string;

    try {
      if (!user?.id) {
        toast.error("No user ID found");
        return;
      }

      loadingToast = toast.loading("Generating summary...");

      const summaryResponse =
        await generateAIResponse<GenerateSummaryResponse>(note);

      if (!summaryResponse) {
        throw new Error("Failed to generate summary");
      }
      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Creating note...");
      const result = await createNote({ ...summaryResponse, userId: user.id });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.dismiss(loadingToast);
      toast.success("Note created successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating note: " + error);
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
