// DeckItem.stories.tsx

import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import DeckItem from "@/components/Decks/DeckItem";

const meta: Meta<typeof DeckItem> = {
  title: "Decks/DeckItem",
  component: DeckItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeckItem>;

export const Default: Story = {
  args: {
    id: "deck1",
    deckName: "Default Deck",
    cardCount: 10,
    userId: "user1",
    color: "#FFD700",
    createdAt: new Date().toISOString(),
  },
};

export const Empty: Story = {
  args: {
    id: "deck2",
    deckName: "Empty Deck",
    cardCount: 0, // Triggers the "No cards" display in the component.
    userId: "user2",
    color: "#FF5733",
    createdAt: new Date().toISOString(),
  },
};

export const LongName: Story = {
  args: {
    id: "deck3",
    deckName:
      "This is an exceptionally long deck name intended to test the text truncation behavior in the DeckItem component. It should truncate properly to avoid breaking the layout.",
    cardCount: 7,
    userId: "user3",
    color: "#33C1FF",
    createdAt: new Date().toISOString(),
  },
};
