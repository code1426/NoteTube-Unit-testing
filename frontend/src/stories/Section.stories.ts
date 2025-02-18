import { Meta, StoryObj } from "@storybook/react";
import Section from "../components/Landing/Section";

const meta: Meta<typeof Section> = {
    component: Section,
  };

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
    args: {
        title: "Upload Notes",
        description:
          "Break free from traditional note-taking limitations. Simply upload your handwritten, typed, or digital notes in any format - PDFs, images, text documents - and watch as NoteTube intelligently processes and transforms them into a comprehensive learning experience tailored just for you.",
        reverse: false,
    }
};


export const WithImage: Story = {
    args: {
        title: "Get Related Videos",
        description:
            "Our initiatives include reducing waste, promoting recycling, and encouraging sustainable practices among communities.",
        reverse: false,
        image: "./videos.png",
    }
};

export const Reversed: Story = {
    args: {
        title: "Use Generated Flashcards",
        description:
            "We are a passionate team dedicated to making a difference through green initiatives and responsible practices.",
        reverse: true,
        image: "./cards.png",
    }
};
