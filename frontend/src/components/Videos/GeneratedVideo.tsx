import { Card, CardTitle } from "../ui/card";

interface GeneratedVideo {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  onClickFunction: (videoId: string) => void;
}

export const VideoCard = ({
  videoId,
  thumbnailUrl,
  title,
  onClickFunction,
}: GeneratedVideo) => {
  return (
    <Card
      className="flex flex-row py-2 px-2 cursor-pointer shadow-md mb-2 bg-white dark:bg-dark-foreground"
      onClick={() => onClickFunction(videoId)}
    >
      <div
        id="video-thumbnail-container"
        className="border border-black h-24 w-36 rounded-2xl bg-black overflow-hidden flex justify-center items-center"
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-fill rounded-xl"
        />
      </div>
      <CardTitle className="w-[60%] px-3 py-1 font-sans">{title}</CardTitle>
    </Card>
  );
};

export default VideoCard;
