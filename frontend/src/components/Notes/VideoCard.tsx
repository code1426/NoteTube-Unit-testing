import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import React, { useState } from "react";
import HoverVideoCard from "./HoverVideoCard";

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
        className="cursor-pointer rounded-lg overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300"
        onClick={() => setVideoPanelState(videoId)}
      >
        <img
          className="w-full h-48 object-cover"
          src={thumbnailUrl}
          alt={title}
        />
        <div className="bg-white dark:bg-dark-foreground px-4 py-3">
          <HoverCard>
            <HoverCardTrigger>
              <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
                {title}
              </h3>
            </HoverCardTrigger>
            <HoverVideoCard title={title} />
          </HoverCard>
        </div>
      </div>

      {videoPanelOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setVideoPanelState(null)}
        >
          <div
            className="bg-white dark:bg-dark-background w-full max-w-7xl p-4 rounded-lg"
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
