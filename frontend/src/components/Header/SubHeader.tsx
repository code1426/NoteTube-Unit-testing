import { useState } from "react";
import {
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiX,
  PiDotsThreeCircle,
} from "react-icons/pi";
import FilterCardModal from "../Flashcards/FilterFlashcardModal";
import { Link } from "react-router-dom";
import { options } from "../../types/options.types";

interface SubHeaderProps {
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
  hasAddButton: boolean;
  onAdd?: () => void;
  deckId?: string;
  onApplyOptions?: (options: options) => void;
  onSearch?: (searchText: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  isFlashCardsPage,
  isSectionTitleOnly,
  sectionTitle,
  hasAddButton,
  onAdd,
  deckId,
  onApplyOptions,
  onSearch,
}) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText("");
  };

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleApplyOptions = (selectedOptions: options) => {
    if (onApplyOptions) {
      onApplyOptions(selectedOptions);
    }
  };

  return (
    <div>
      <div className="subheader px-20 py-10 flex justify-between items-center select-none">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          {sectionTitle}

          {/* Optional button for manage options */}
          {!isSectionTitleOnly && (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
              onClick={() => console.log("manage button")} // placeholder
            >
              <PiDotsThreeCircle size={50} />
            </button>
          )}
        </div>

        {!isSectionTitleOnly && (
          <div className="flex text-3xl font-secondaryRegular space-x-5 justify-center items-center">
            {isFlashCardsPage && (
              <div>
                <Link to={`/quiz/${deckId}`}>
                  <button className="flex py-5 px-16 border-2 border-black bg-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200">
                    <PiCards size={30} /> Quiz
                  </button>
                </Link>
              </div>
            )}
            {hasAddButton && (
              <div>
                <button
                  className="flex py-5 px-16 border-2 border-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200"
                  onClick={onAdd}
                >
                  <PiPlus size={30} /> Add
                </button>
              </div>
            )}
            <div>
              {/* Search bar toggle */}
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
                    onChange={(e) => {
                      const newSearchtext = e.target.value;
                      setSearchText(newSearchtext);
                      if (onSearch) {
                        onSearch(newSearchtext);
                      }
                    }}
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

            {/* Filter button */}
            <div className="relative">
              <button
                className="flex items-center hover:underline gap-2"
                onClick={openFilter}
              >
                <PiFunnel size={40} /> Filter
              </button>
              {/* Render FilterCardModal conditionally */}
              {isFilterOpen && (
                <FilterCardModal
                  onClose={closeFilter}
                  onApply={handleApplyOptions}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
