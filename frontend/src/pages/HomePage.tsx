import toast, { Toaster } from "react-hot-toast";

import GreetingsBanner from "@/components/Header/GreetingsBanner";
import Header from "@/components/Header/Header";
import LoadingScreen from "../components/LoadingScreen";

import type {
  GenerateAIResponseProps,
  GeneratedFlashcard,
} from "@/types/ai.types";
import { Video } from "@/types/video.types";
import { Deck } from "@/types/deck.types";

import useUser from "@/hooks/auth/useUser";
import useCreateNote from "@/hooks/Notes/useCreateNote";
import useCreateVideos from "@/hooks/Videos/useCreateVideo";
import useCreateDeck from "@/hooks/Decks/useCreateDeck";
import useCreateFlashcard from "@/hooks/Flashcards/useCreateFlashcard";

import getVideoSuggestions from "@/utils/getVideoSuggestions";
import fetchAIResponse from "@/utils/fetchAIResponse";
import { Flashcard } from "@/types/flashcard.types";
import NoteInputForm from "../components/Notes/NoteInputForm";

const HomePage = () => {
  const { user, loading: loadingUser } = useUser();
  const { createNote } = useCreateNote();
  const { insertVideos } = useCreateVideos();
  const { createDeck } = useCreateDeck();
  const { createFlashcard } = useCreateFlashcard();

  const handleAddFlashcards = async (
    deckId: string,
    generatedFlashcards: GeneratedFlashcard[],
  ) => {
    try {
      console.log(generatedFlashcards);
      const flashcards = generatedFlashcards.map((item) => ({
        id: "",
        ...item,
        deckId,
      }));

      flashcards.map(async (flashcard: Flashcard) => {
        const result = await createFlashcard(flashcard);

        if (result.error) {
          throw new Error(result.error);
        }
      });
    } catch (error) {
      toast.error("Error creating flashcards: " + error);
      return;
    }
  };

  const handleCreateDeck = async (deckData: Deck) => {
    try {
      const result = await createDeck({ ...deckData });

      if (result.error) {
        throw new Error(result.error);
      }

      return result.deck;
    } catch (error) {
      toast.error("Error creating deck: " + error);
      return;
    }
  };

  const handleAddVideos = async (noteId: string | null, videoList: Video[]) => {
    try {
      if (!noteId) {
        throw new Error("No note ID found");
      }

      const result = await insertVideos(noteId, videoList).catch((error) => {
        throw new Error("Failed to add videos: " + error);
      });

      result.map((video, index) =>
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

      // generate summary
      loadingToast = toast.loading("Generating AI response...");

      const AIresponse = await fetchAIResponse(note).catch((error) => {
        throw new Error("Failed to fetch AI response: " + error);
      });

      if (!AIresponse?.summary) {
        throw new Error("Failed to generate summary");
      }

      if (!AIresponse?.flashcards) {
        throw new Error("Failed to generate flashcards");
      }

      const summary = AIresponse.summary;

      console.log(summary);
      toast.dismiss(loadingToast);

      // get video suggestions
      loadingToast = toast.loading("Getting video suggestions...");
      const suggestedVideos = await getVideoSuggestions(summary.content).then(
        (videos) => videos?.slice(0, 5),
      ); // get 5 videos

      if (!suggestedVideos) {
        throw new Error("Failed to get video suggestions");
      }
      toast.dismiss(loadingToast);

      // create deck from note
      loadingToast = toast.loading("Creating deck ...");
      const deckData: Deck = {
        id: "",
        deckName: summary.title,
        color: "green",
        userId: user.id,
      };
      const createdDeck = await handleCreateDeck(deckData);

      if (!createdDeck) {
        throw new Error("Failed to create deck");
      }

      toast.dismiss(loadingToast);

      // create flashcards to created deck
      loadingToast = toast.loading("Creating flashcards...");

      handleAddFlashcards(createdDeck.id, AIresponse.flashcards.items);

      toast.dismiss(loadingToast);

      loadingToast = toast.loading("Creating note...");
      const result = await createNote({ ...summary, userId: user.id });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.dismiss(loadingToast);

      // add videos to note
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
        <GreetingsBanner
          isHomePage={true}
          username={user.username || "Guest"}
        />
        <Header
          isHomepage={true}
          isFlashCardsPage={false}
          isSectionTitleOnly={true}
          hasAddButton={false}
          sectionTitle="Upload Notes"
        />
        <NoteInputForm onSubmit={handleAddNote} />
        {/* <NoteInputField onSubmit={handleAddNote} /> */}
      </div>
    </>
  );
};

export default HomePage;
