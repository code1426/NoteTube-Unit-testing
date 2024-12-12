import { Separator } from "@radix-ui/react-separator";
import { Label } from "../ui/label";

interface QuizFlashcardProps {
  front: string;
  back: string;
  isBackVisible: boolean;
}

const QuizFlashcard: React.FC<QuizFlashcardProps> = ({
  front,
  back,
  isBackVisible,
}) => {
  return (
    <div className="flex flex-col w-full md:min-h-44 lg:min-h-44 xl:min-h-44 md:h-full lg:h-full xl:h-full bg-white border-2 border-green rounded-xl p-4 sm:p-6 shadow-sm">
      {/* Front Content */}
      <div className="front flex w-full flex-1">
        <Label
          className="text-wrap flex-1 overflow-hidden"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
          }}
        >
          {front}
        </Label>
      </div>

      {/* Separator */}
      <Separator className="border-t-2 border-gray-300 w-full my-4" />

      {/* Back Content */}
      <div className="back flex w-full flex-1">
        <Label
          className="text-wrap flex-1 overflow-hidden"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
          }}
        >
          {isBackVisible ? back : " "}
        </Label>
      </div>
    </div>
  );
};

export default QuizFlashcard;
