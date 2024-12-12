import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import GreetingsBanner from "@/components/Header/GreetingsBanner";
import Header from "@/components/Header/Header";
import LoadingScreen from "../components/LoadingScreen";

import type {
  GenerateAIResponseProps,
  GeneratedFlashcard,
} from "@/types/ai.types";
import { Video } from "@/types/video.types";
import { Deck } from "@/types/deck.types";

import useCreateNote from "@/hooks/Notes/useCreateNote";
import useCreateVideos from "@/hooks/Videos/useCreateVideo";
import useCreateDeck from "@/hooks/Decks/useCreateDeck";
import useCreateFlashcard from "@/hooks/Flashcards/useCreateFlashcard";

import getVideoSuggestions from "@/utils/getVideoSuggestions";
import fetchAIResponse from "@/utils/fetchAIResponse";
import { Flashcard } from "@/types/flashcard.types";
import NoteInputForm from "@/components/Notes/NoteInputForm";

import { UserContext } from "@/context/Contexts";

import { toast } from "sonner";
import AnimatedProgressBar from "@/components/Notes/AnimatedProgressBar";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      // generate summary
      const AIResponseLoad = toast.promise(fetchAIResponse(note), {
        loading: <AnimatedProgressBar />,
        success: () => {
          return `AI response generated successfully`;
        },
        error: (error) => {
          return `Failed to generate AI response: ${error}`;
        },
      });

      const AIresponse = await AIResponseLoad.unwrap();

      if (!AIresponse?.summary) {
        throw new Error("Failed to generate summary");
      }

      if (!AIresponse?.flashcards) {
        throw new Error("Failed to generate flashcards");
      }

      const summary = AIresponse.summary;

      // get video suggestions
      const videoSuggestionsLoad = toast.promise(
        getVideoSuggestions(summary.content),
        {
          loading: <AnimatedProgressBar />,
          success: () => {
            return `Got video suggestions successfully`;
          },
          error: (error) => {
            return `Failed to generate video suggestions: ${error}`;
          },
        },
      );

      const suggestedVideos = await videoSuggestionsLoad
        .unwrap()
        .then((videos) => videos?.slice(0, 5));

      if (!suggestedVideos) {
        throw new Error("Failed to get video suggestions");
      }

      const deckData: Deck = {
        id: "",
        deckName: summary.title,
        color: "green",
        userId: user.id,
      };

      const deckLoad = toast.promise(handleCreateDeck(deckData), {
        loading: <AnimatedProgressBar />,
        success: () => {
          return `Created deck successfully`;
        },
        error: (error) => {
          return `Failed to create deck: ${error}`;
        },
      });

      const createdDeck = await deckLoad.unwrap();

      if (!createdDeck) {
        throw new Error("Failed to create deck");
      }

      // create flashcards to created deck
      toast.promise(
        handleAddFlashcards(createdDeck.id, AIresponse.flashcards.items),
        {
          loading: <AnimatedProgressBar />,
          success: () => {
            return `Created flashcards successfully`;
          },
          error: (error) => {
            return `Failed to create flashcards: ${error}`;
          },
        },
      );

      const noteLoad = toast.promise(
        createNote({ ...summary, userId: user.id }),
        {
          loading: <AnimatedProgressBar />,
          success: () => {
            return `Created note successfully`;
          },
          error: (error) => {
            return `Failed to create note: ${error}`;
          },
        },
      );

      const result = await noteLoad.unwrap();

      if (result.error) {
        throw new Error(result.error);
      }

      // add videos to note
      handleAddVideos(result.note?.id || null, suggestedVideos);
      navigate("/generated-videos");
    } catch (error) {
      toast.dismiss();
      toast.error(
        "Error creating note: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* <Toaster /> */}
      <div className="relative w-full min-h-screen bg-white overflow-auto flex flex-col scrollbar-custom h-screen">
        <GreetingsBanner />
        <Header
          isHomepage={true}
          isFlashCardsPage={false}
          isSectionTitleOnly={true}
          hasAddButton={false}
          sectionTitle="Upload Notes"
        />
        <NoteInputForm onSubmit={handleAddNote} disabled={loading} />
      </div>
    </>
  );
};

export default HomePage;
