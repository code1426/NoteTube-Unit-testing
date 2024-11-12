import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiUpload,
  PiUserCircleFill,
} from "react-icons/pi";

const HomePage = () => {
  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      {/* Header Top Section */}
      <div className="header-top w-full px-4 py-6 bg-white flex justify-between items-center">
        <div className="text-black text-4xl md:text-6xl lg:text-6xl font-primaryBold">
          Welcome User!
        </div>
        <div>
          <button>
            <PiUserCircleFill size={60} />
          </button>
        </div>
      </div>

      {/* Header Bottom Section */}
      <div className="header-bottom w-full px-20 pt-20 pb-10 bg-white flex justify-between items-center">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl font-secondaryRegular">
          Upload Notes
        </div>
      </div>

      {/* Upload Notes Section */}
      <div className="uploadNotes relative w-full h-auto min-h-screen px-20 bg-white">
        <div className="w-full bg-white rounded-lg border-4 border-[#03c04a] flex flex-col">
          <textarea
            className="w-auto h-80 p-3 rounded-lg border-2 border-[#03c04a] text-black justify-left text-3xl font-primaryRegular overflow-hidden overflow-y-scroll resize-none scrollbar-hidden"
            placeholder="Input text here"
          />
          <div className="editText text-gray-400 text-sm mt-2 flex gap-2">
            <button className="p-2 text-black hover:bg-gray-200 rounded">
              <PiListBold size={40} />
            </button>
            <button className="p-2 text-black hover:bg-gray-200 rounded">
              <PiListNumbersBold size={40} />
            </button>
          </div>
        </div>
        <div className="p-5 flex justify-between">
          <button className="px-6 py-3 flex bg-[#03c04a] text-white rounded-lg text-2xl font-secondaryRegular text-wrap">
            <PiPaperclip size={30} />
            Attach Files
          </button>
          <button className="px-6 py-3 flex gap-2 border-2 border-[#03c04a] text-black rounded-lg text-2xl font-secondaryRegular text-wrap">
            <PiUpload size={30} />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
