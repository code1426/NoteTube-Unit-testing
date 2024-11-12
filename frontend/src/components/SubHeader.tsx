import {
  PiDotsThreeCircle,
  PiFunnel,
  PiMagnifyingGlass,
  PiPlus,
  PiCards,
} from "react-icons/pi";

const SubHeader = () => {
  return (
    <div>
      <div className="header-bottom w-full px-20 pt-20 pb-10 bg-white flex justify-between items-center">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          <div>DeckName</div>
          <div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
              <PiDotsThreeCircle size={50} />
            </button>
          </div>
        </div>
        <div className="flex text-3xl font-secondaryRegular space-x-5 justify-center items-center">
          <div>
            <button className="flex py-5 px-16 border-2 border-black bg-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200">
              <PiCards size={30} /> Quiz
            </button>
          </div>
          <div>
            <button className="flex py-5 px-16 border-2 border-[#03c04a] bg-[white] rounded-[50px] gap-2 hover:bg-gray-200">
              <PiPlus size={30} /> Add
            </button>
          </div>
          <div>
            <button className="flex items-center hover:underline gap-2">
              <PiMagnifyingGlass size={40} /> Search
            </button>
          </div>
          <div>
            <button className="flex items-center hover:underline gap-2">
              <PiFunnel size={40} /> Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
