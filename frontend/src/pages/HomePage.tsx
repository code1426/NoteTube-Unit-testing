import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import GreetingsBanner from "@/components/Header/GreetingsBanner";
import Header from "@/components/Header/Header";
import LoadingScreen from "@/components/LoadingScreen";
import NoteInputForm from "@/components/Notes/NoteInputForm";
import AnimatedProgressBar from "@/components/Notes/AnimatedProgressBar";

import type {
  GenerateAIResponseProps,
  GeneratedFlashcard,
} from "@/types/ai.types";
import type { Video } from "@/types/video.types";
import type { DeckEntity } from "@/types/deck.types";
import type { Flashcard } from "@/types/flashcard.types";

import useCreateNote from "@/hooks/Notes/useCreateNote";
import useCreateVideos from "@/hooks/Videos/useCreateVideo";
import useCreateDeck from "@/hooks/Decks/useCreateDeck";
import useCreateFlashcard from "@/hooks/Flashcards/useCreateFlashcard";

import { UserContext } from "@/context/Contexts";

import getVideoSuggestions from "@/utils/getVideoSuggestions";
import fetchAIResponse from "@/utils/fetchAIResponse";
import generateRandomColor from "@/utils/generateRandomColor";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleCreateDeck = async (deckData: DeckEntity) => {
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
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      // generate summary
      const AIResponseLoad = toast.promise(fetchAIResponse(note), {
        loading: <AnimatedProgressBar title="Generating AI response" />,
        success: () => {
          return `AI response generated successfully`;
        },
        error: (error) => {
          return `Failed to generate AI response: ${error}`;
        },
      });

      const AIResponse = await AIResponseLoad.unwrap();

      // const AIResponse = await fetchAIResponse(note).catch((error) => {
      //   throw new Error(error.message);
      // });

      if (!AIResponse?.summary) {
        throw new Error("Failed to generate summary");
      }

      if (!AIResponse?.flashcards) {
        throw new Error("Failed to generate flashcards");
      }

      const summary = AIResponse.summary;

      // get video suggestions
      const videoSuggestionsLoad = toast.promise(
        getVideoSuggestions(summary.content),
        {
          loading: <AnimatedProgressBar title="Getting suggested videos" />,
          success: () => {
            return `Got suggested videos successfully`;
          },
          error: (error) => {
            return `Failed to get suggested videos: ${error}`;
          },
        },
      );

      const suggestedVideos = await videoSuggestionsLoad
        .unwrap()
        .then((videos) => videos?.slice(0, 5));

      // const suggestedVideos = await getVideoSuggestions(summary.content)
      //   .then((videos) => videos?.slice(0, 5))
      //   .catch((error) => {
      //     throw new Error(error.message);
      //   });

      if (!suggestedVideos) {
        throw new Error("Failed to get suggested videos");
      }

      const deckData: DeckEntity = {
        id: "",
        deck_name: summary.title,
        color: generateRandomColor(),
        user_id: user.id,
        card_count: AIResponse.flashcards.items.length,
      };

      const deckLoad = toast.promise(handleCreateDeck(deckData), {
        loading: <AnimatedProgressBar title="Creating deck" className="" />,
        success: () => {
          return `Created deck successfully`;
        },
        error: (error) => {
          return `Failed to create deck: ${error}`;
        },
      });

      const createdDeck = await deckLoad.unwrap();

      // const createdDeck = await handleCreateDeck(deckData).catch((error) => {
      //   throw new Error(error.message);
      // });

      if (!createdDeck) {
        throw new Error("Failed to create deck");
      }

      // create flashcards to created deck
      toast.promise(
        handleAddFlashcards(createdDeck.id, AIResponse.flashcards.items),
        {
          loading: <AnimatedProgressBar title="Creating flashcards" />,
          success: () => {
            return `Created flashcards successfully`;
          },
          error: (error) => {
            return `Failed to create flashcards: ${error}`;
          },
        },
      );

      // await handleAddFlashcards(createdDeck.id, AIResponse.flashcards.items);

      const noteLoad = toast.promise(
        createNote({ ...summary, userId: user.id }),
        {
          loading: <AnimatedProgressBar title="Creating note" />,
          success: () => {
            return `Created note successfully`;
          },
          error: (error) => {
            return `Failed to create note: ${error}`;
          },
        },
      );

      const result = await noteLoad.unwrap();

      // const result = await createNote({ ...summary, userId: user.id });

      if (result.error) {
        throw new Error(result.error);
      }

      // add videos to note
      await handleAddVideos(result.note?.id || null, suggestedVideos);

      navigate("/generated-videos");
    } catch (error) {
      toast.dismiss();
      toast.error(
        "Error creating note: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
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
        <NoteInputForm onSubmit={handleAddNote} />
      </div>
    </>
  );
};

export default HomePage;
