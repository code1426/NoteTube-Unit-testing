import React, { useState } from "react";

interface VideoCardProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoId,
  thumbnailUrl,
  title,
}) => {
  const [videoPanelOpened, setVideoPanelState] = useState<string | null>(null);

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-lg group"
        onClick={() => setVideoPanelState(videoId)}
      >
        <div className="">
          <img
            className="w-full h-48 object-cover"
            src={thumbnailUrl}
            alt={title}
          />
        </div>
        <div className="bg-white px-3 py-2 text-center">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {title}
          </h3>
        </div>
      </div>

      {videoPanelOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setVideoPanelState(null)}
        >
          <div
            className="bg-white w-full max-w-7xl p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-[70vh]"
              src={`https://www.youtube.com/embed/${videoPanelOpened}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
