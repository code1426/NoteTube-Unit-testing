import Header from "../components/header";
import SubHeader from "../components/SubHeader";
import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiTrash,
  PiUpload,
} from "react-icons/pi";

function FlashcardsPage() {
  return (
    <div className="w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={false} />
      <SubHeader />
      <div className="w-full bg-white rounded-lg border-4 border-[#03c04a] flex flex-col">
        <textarea
          className="w-auto h-80 p-3 rounded-lg border-2 border-[#03c04a] text-black justify-left text-3xl font-primaryRegular overflow-hidden overflow-y-scroll resize-none scrollbar-hidden"
          placeholder="Input text here"
        />
        <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
          <div className="flex gap-2">
            <button className="p-2 text-black hover:bg-gray-200 rounded">
              <PiListBold size={40} />
            </button>
            <button className="p-2 text-black hover:bg-gray-200 rounded">
              <PiListNumbersBold size={40} />
            </button>
          </div>
          <button className="p-2 text-black hover:bg-gray-200 rounded">
            <PiTrash size={40} />
          </button>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center gap-4">
        <label className="px-6 py-3 flex items-center bg-[#03c04a] text-white rounded-lg text-2xl font-secondaryRegular cursor-pointer">
          <PiPaperclip size={30} />
          <span className="ml-2">Attach Files</span>
        </label>
        <button className="px-6 py-3 flex gap-2 border-2 border-[#03c04a] text-black rounded-lg text-2xl font-secondaryRegular">
          <PiUpload size={30} />
          Upload
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default FlashcardsPage;
