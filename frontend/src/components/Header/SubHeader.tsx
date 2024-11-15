import { useState } from "react";
import {
  PiDotsThreeCircle,
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiX,
} from "react-icons/pi";

interface SubHeaderProps {
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  isFlashCardsPage,
  isSectionTitleOnly,
  sectionTitle,
}) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const handleManage = () => {
    return null;
  };

  const handleQuiz = () => {
    return null;
  };

  const handleAdd = () => {
    return null;
  };

  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText("");
  };

  const handleFilter = () => {
    return null;
  };

  return (
    <div>
      <div className="subheader px-20 py-10 flex justify-between items-center">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          <div>{sectionTitle}</div>

          {!isSectionTitleOnly && (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
              onClick={handleManage}
            >
              <PiDotsThreeCircle size={50} />
            </button>
          )}
        </div>

        {!isSectionTitleOnly && (
          <div className="flex text-3xl font-secondaryRegular space-x-5 justify-center items-center">
            {isFlashCardsPage && (
              <div>
                <button
                  className="flex py-5 px-16 border-2 border-black bg-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200"
                  onClick={handleQuiz}
                >
                  <PiCards size={30} /> Quiz
                </button>
              </div>
            )}
            <div>
              <button
                className="flex py-5 px-16 border-2 border-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200"
                onClick={handleAdd}
              >
                <PiPlus size={30} /> Add
              </button>
            </div>
            <div>
              {isSearchActive ? (
                <div className="flex items-center gap-2 border-2 border-[#03c04a] rounded-full px-4 py-2">
                  <button
                    onClick={handleSearch}
                    className="text-black hover:bg-gray-200 rounded-full p-1"
                  >
                    <PiX size={25} />
                  </button>
                  <input
                    type="text"
                    value={searchText}
                    placeholder="Search..."
                    className="flex-1 focus:outline-none"
                    autoFocus
                  />
                </div>
              ) : (
                <button
                  className="flex items-center hover:underline gap-2"
                  onClick={handleSearch}
                >
                  <PiMagnifyingGlass size={40} /> Search
                </button>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center hover:underline gap-2"
                onClick={handleFilter}
              >
                <PiFunnel size={40} /> Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
