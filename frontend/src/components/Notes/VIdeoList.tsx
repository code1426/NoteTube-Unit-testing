import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import VideoCard from "./VideoCard";
// import Image from "next/image";

interface Video {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <p className="text-muted-foreground text-center italic">
        No videos found for this note.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard
          thumbnailUrl={video.thumbnailUrl}
          title={video.title}
          videoId={video.videoId}
        />
      ))}
    </div>
  );
};

export default VideoList;
