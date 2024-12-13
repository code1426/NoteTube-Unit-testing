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
      className="flex flex-row py-2 px-2 shadow-md"
      onClick={() => onClickFunction(videoId)}
    >
      <div
        id="video-thumbnail-container"
        className="border-2 border-black h-24 w-36 rounded-2xl bg-black overflow-hidden flex justify-center items-center"
      >
        <div className="h-360 w-full flex justify-center">
          <img
            src={thumbnailUrl}
            alt={title}
            className="object-scale-down"
          ></img>
        </div>
      </div>
      <CardTitle className="w-[60%] px-3 py-1 font-sans">{title}</CardTitle>
    </Card>
  );
};

export default VideoCard;
