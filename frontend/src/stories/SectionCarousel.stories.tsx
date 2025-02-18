import { Meta, StoryObj } from "@storybook/react";
import SectionCarousel from "@/components/Landing/SectionCarousel";
import Section from "@/components/Landing/Section";

const meta: Meta<typeof SectionCarousel> = {
  title: "Landing/SectionCarousel",
  component: SectionCarousel,
};

export default meta;
type Story = StoryObj<typeof SectionCarousel>;

const featureSections = [
  {
    title: "Upload Notes",
    description:
      "Break free from traditional note-taking limitations. Simply upload your handwritten, typed, or digital notes in any format - PDFs, images, text documents - and watch as NoteTube intelligently processes and transforms them into a comprehensive learning experience tailored just for you.",
    image: "/notes.png",
  },
  {
    title: "Get Related Videos",
    description:
      "Dive deeper into your learning with curated, intelligent video recommendations. Our AI analyzes your notes and finds the most relevant, high-quality educational content from across the web, ensuring you get targeted explanations that complement and enhance your existing study materials.",
    image: "./videos.png",
  },
  {
    title: "Use Generated Flashcards",
    description:
      "Supercharge your memory retention with AI-powered flashcards. NoteTube automatically generates smart, context-aware flashcards from your notes, presenting key concepts, definitions, and critical information in an interactive format that makes studying more engaging and efficient.",
    image: "./cards.png",
  },
];

export const Default: Story = {
  args: {
    children: featureSections.map((section, index) => (
      <Section
        key={index}
        title={section.title}
        description={section.description}
        reverse={index % 2 === 0}
        image={section.image}
      />
    )),
    duration: 5000,
  },
};

export const FastCarousel: Story = {
  args: {
    ...Default.args,
    duration: 1000,
  },
};

export const SlowCarousel: Story = {
  args: {
    ...Default.args,
    duration: 10000,
  },
};
