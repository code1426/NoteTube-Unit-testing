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
              "The answer or solution side of the flashcard. This provides the direct answer to the question on the front. Limit the answer to a just a concise term, it should never be a long phrase.",
            nullable: false,
          },
          front: {
            type: SchemaType.STRING,
            description:
              "The question or prompt side of the flashcard. This should be concise and designed to obtain the answer on the back. ",
            nullable: false,
          },
        },
        required: ["front", "back"],
      },
      example: [
        { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
        { front: "What is the capital of France?", back: "Paris" },
        { front: "5 * 7 + 3 = ", back: "38" },
        {
          front:
            "The smallest unit of an element that retains the chemical properties of that element.",
          back: "Atom",
        },
        {
          front:
            "The process by which plants convert light energy into chemical energy",
          back: "Photosynthesis",
        },
      ],
    },
  },
  required: ["items"],
};

export default generateFlashcards;
