interface GeneratedVideo {
  videoId: string;
  thumbnailUrl: string;
  onClickFunction: (videoId: string) => void;
}

export const VideoCard = ({
  videoId,
  thumbnailUrl,
  onClickFunction,
}: GeneratedVideo) => {
  return (
    <div
      id="video-card"
      className="border-2 border-black h-32 w-48 rounded-2xl bg-black overflow-hidden flex justify-center items-center"
      onClick={() => onClickFunction(videoId)}
    >
      <div className="h-30 w-40 flex justify-center">
        <img
          src={thumbnailUrl}
          alt={"No Thumbnail Found"}
          className="object-scale-down"
        ></img>
      </div>
    </div>
  );
};

export default VideoCard;
