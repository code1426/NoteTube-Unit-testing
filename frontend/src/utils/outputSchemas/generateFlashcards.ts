import { Schema, SchemaType } from "@google/generative-ai";

const generateSummary: Schema = {
  description: "A list of flashcards about the given text",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      front: {
        type: SchemaType.STRING,
        description: "A description of the term or concept",
        nullable: false,
      },
      back: {
        type: SchemaType.STRING,
        description:
          "A term or concept that the description refers to. Make it short, concise and clear.",
        nullable: false,
      },
    },
    required: ["front", "back"],
  },
};

export default generateSummary;
