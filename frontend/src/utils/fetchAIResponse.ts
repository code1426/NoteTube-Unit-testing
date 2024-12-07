import { AIResponse, GenerateAIResponseProps } from "@/types/ai.types";

const fetchAIResponse = async (props: GenerateAIResponseProps) => {
  try {
    if (typeof props.input === "string") {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/ai/text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = (await response.json()) as AIResponse;
      console.log(result);
      return result;
    } else if (props.input instanceof FileList) {
      const formData = new FormData();

      [...props.input].map((file) => {
        const blob = new Blob([file], { type: file.type });
        formData.append("files", blob, file.name);
      });

      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/ai/file`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = (await response.json()) as AIResponse;
      console.log(result);
      return result;
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export default fetchAIResponse;
