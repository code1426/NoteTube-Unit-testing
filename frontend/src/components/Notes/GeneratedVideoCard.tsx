import { useState } from "react";
import { TestGeneratedVideo } from "../History/GeneratedVideoThumbnail";

const GeneratedVideoCard = ({ id, videoTitle }: TestGeneratedVideo) => {
  const [videoPanelOpened, setVideoPanelState] = useState(false);

  return (
    <div className="w-4/6 h-auto flex flex-col items-center border-[6px] border-green border-solid rounded-3xl overflow-hidden">
      {/* the div below is for the video title and icons*/}
      <div
        onClick={() => setVideoPanelState(!videoPanelOpened)}
        className="w-full h-full flex flex-row justify-center"
      >
        <div className="h-12 flex flex-col justify-center">{videoTitle}</div>
      </div>
      {/* the div below is for the video */}
      {videoPanelOpened ? (
        <div className="w-full h-[36rem] bg-black border-[4px] border-black border-solid flex flex-col items-center p-3">
          <iframe
            className="w-[98%] h-[100%]"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen={true}
          ></iframe>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GeneratedVideoCard;
