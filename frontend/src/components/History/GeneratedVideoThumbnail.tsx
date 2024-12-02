export interface TestGeneratedVideo {
  url: string;
  videoTitle: string;
  id: string;
}

const HistoryGeneratedVideoThumbnail = ({
  url,
  videoTitle,
}: TestGeneratedVideo) => {
  return (
    <div className="bg-black border-[4px] border-gray-500 border-solid rounded-3xl overflow-hidden">
      <div className="h-24 w-40 flex justify-center">
        <img
          src={`${url}`}
          alt={`${videoTitle}`}
          className="object-scale-down"
        />
      </div>
    </div>
  );
};

export default HistoryGeneratedVideoThumbnail;
