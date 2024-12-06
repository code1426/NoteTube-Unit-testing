import { Schema, SchemaType } from "@google/generative-ai";

const generateFlashcards: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    items: {
      description: "A list of flashcards about the given notes.",
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          back: {
            type: SchemaType.STRING,
            description:
              "A term or concept that the description refers to. For example, 'Paris' or 'RAM'.",
            nullable: false,
          },
          front: {
            type: SchemaType.STRING,
            description:
              "A description of the term or concept. Make it short, clear and concise. It can be in the form of a question or a statement. For example, 'What is the capital of France?' or 'It is a type of computer memory that can be randomly accessed.",
            nullable: false,
          },
        },
        nullable: false,
        required: ["front", "back"],
      },
    },
  },
  required: ["items"],
};

export default generateFlashcards;
