import { useState } from "react";
import { PiQuestionBold, PiExclamationMarkBold } from "react-icons/pi";

interface QuizFlashcardProps {
  front: string;
  back: string;
}

const QuizFlashcard: React.FC<QuizFlashcardProps> = ({ front, back }) => {
  const [text, setText] = useState(front);
  const [isFlipped, setIsFlipped] = useState(false);
  const [info, setInfo] = useState("answer");
  const [faceInfo, setFaceInfo] = useState("Question");
  const [effect, setEffect] = useState(false);

  const handleFlip = () => {
    if (isFlipped) {
      setText(front);
      setInfo("answer");
      setFaceInfo("Question");
    } else {
      setText(back);
      setInfo("question");
      setFaceInfo("Answer");
    }
    setEffect(true);
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`${effect ? "animate-flip" : ""} w-[60vh] h-[75vh] bg-green grid place-items-center rounded-[50px]`}
      onClick={handleFlip}
      onAnimationEnd={() => setEffect(false)}
    >
      <div className="w-[57vh] h-[72vh] bg-white rounded-[50px] border-7 border-[#03c04a] grid place-items-center">
        <div className="w-[54vh] h-[69vh] bg-green rounded-[35px] border-1 border-[#03c04a] grid place-items-center">
          <div className="text-center flex flex-col text-white text-3xl p-4 items-center font-bold">
            {isFlipped ? (
              <PiExclamationMarkBold size={50} />
            ) : (
              <PiQuestionBold size={50} />
            )}
            {faceInfo}
          </div>

          <div className="text-center text-white text-2xl p-4 font-semibold">
            {text}
          </div>
          <div className="text-center text-white text-1xl p-4">
            Flip the card for {info}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizFlashcard;
