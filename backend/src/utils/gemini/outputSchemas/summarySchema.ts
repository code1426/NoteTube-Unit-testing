import { Schema, SchemaType } from "@google/generative-ai";

const generateSummary: Schema = {
  description: "A summary of the given notes.",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description:
        "Title or topic of the notes. Make it short, clear and concise. Do not use the words 'summary' or 'notes'.",
      nullable: false,
    },
    content: {
      type: SchemaType.STRING,
      description:
        "Content of the notes. Make it a bit comprehensive. Include specifics and details. Avoid referring to it in third person. The content should be the note itself. It should be useful for someone who wants to understand the topic.",
      nullable: false,
    },
  },
  required: ["title", "content"],
};

export default generateSummary;
