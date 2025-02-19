import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import FlashcardItem from "@/components/Flashcards/FlashcardItem";

const meta: Meta<typeof FlashcardItem> = {
  title: "Flashcards/FlashcardItem",
  component: FlashcardItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FlashcardItem>;

export const Default: Story = {
  args: {
    id: "flashcard1",
    front: "What is the capital of France?",
    back: "Paris",
    deckId: "deck1",
    created_at: new Date().toISOString(),
  },
};

export const LongText: Story = {
  args: {
    id: "flashcard2",
    front:
      "This is a very long question that might cause layout issues if not properly handled by the component. It should test text wrapping, truncation, and the hover card functionality. Make sure that even when the text is excessively long, the component remains visually appealing and accessible.",
    back: "This is a very long answer that goes on and on, perhaps even spanning multiple sentences or paragraphs. It includes enough detail to test whether the card content area can handle large amounts of text without breaking the layout or causing overflow issues. Testing text rendering is crucial for ensuring a robust UI experience.",
    deckId: "deck1",
    created_at: new Date().toISOString(),
  },
};

export const WithComplexContent: Story = {
  args: {
    id: "flashcard3",
    front: "List out the steps to implement a feature:",
    back: `1. Research the feature requirements.
2. Design the UI/UX.
3. Develop the component and its logic.
4. Write tests to ensure quality.
5. Review and refactor the code.
6. Deploy to production.`,
    deckId: "deck2",
    created_at: new Date().toISOString(),
  },
};
