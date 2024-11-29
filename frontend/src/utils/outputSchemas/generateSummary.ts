import { Schema, SchemaType } from "@google/generative-ai";

const generateSummary: Schema = {
  description: "A summary of the note",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "Title or topic of the note",
      nullable: false,
    },
    content: {
      type: SchemaType.STRING,
      description: "Content of the note",
      nullable: false,
    },
  },
  required: ["title", "content"],
};

export default generateSummary;
