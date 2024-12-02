import { Schema, SchemaType } from "@google/generative-ai";

const generateSummary: Schema = {
  description: "A summary of the given notes.",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description:
        "Title or topic of the notes. Make it short, clear and concise.",
      nullable: false,
    },
    content: {
      type: SchemaType.STRING,
      description: "Content of the notes. Make it short, clear and concise.",
      nullable: false,
    },
  },
  required: ["title", "content"],
};

export default generateSummary;
