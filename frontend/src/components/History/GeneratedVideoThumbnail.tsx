export interface TestGeneratedVideo {
  url: string;
  id: string;
}

const HistoryGeneratedVideoThumbnail = ({ url }: TestGeneratedVideo) => {
  return (
    <div className="bg-black border-[4px] border-gray-500 border-solid rounded-3xl overflow-hidden">
      <div className="h-24 w-40 flex justify-center">
        <img
          src={`${url}`}
          alt={"No Thumbnail Found"}
          className="object-scale-down"
        />
      </div>
    </div>
  );
};

export default HistoryGeneratedVideoThumbnail;
