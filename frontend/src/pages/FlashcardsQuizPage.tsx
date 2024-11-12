import { useState } from "react";
const Flashcards = () => {
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis beatae omnis culpa sed illo voluptas qui blanditiis et. Atque doloribus itaque aliquid labore magnam dolorem nostrum asperiores quisquam repudiandae consequatur.",
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [info, setInfo] = useState("answer");
  const [effect, setEffect] = useState(true);
  function revealAnswer() {
    setText("answer revealed");
    setInfo("question");
    setEffect(true);
    setIsFlipped(true);
  }

  const revealQuestion = () => {
    setText(
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis beatae omnis culpa sed illo voluptas qui blanditiis et. Atque doloribus itaque aliquid labore magnam dolorem nostrum asperiores quisquam repudiandae consequatur.",
    );
    setInfo("answer");
    setEffect(true);
    setIsFlipped(false);
  };
  return (
    <div>
      <div
        className={` w-full md:w-full lg:w-full h-screen flex-grow bg-white grid place-items-center`}
      >
        <div
          className={`${effect ? "animate-flip" : ""} w-[60vh] h-[75vh] bg-green grid place-items-center rounded-[50px]`}
          onClick={isFlipped ? revealQuestion : revealAnswer}
          onAnimationEnd={() => setEffect(false)}
        >
          <div className="w-[57vh] h-[72vh] bg-white rounded-[50px] border-7 border-[#03c04a]  grid place-items-center">
            <div className="w-[54vh] h-[69vh] bg-green rounded-[35px] border-1 border-[#03c04a] grid place-items-center">
              <div className="self-end text-white text-3xl font-semibold">
                No. 1
              </div>
              <div className="text-center text-white text-2xl font-normal p-4">
                {text}
              </div>
              <div className="text-center text-white text-1xl font-semibold p-4">
                Flip the card for {info}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
