import { useState } from "react";
import {
  PiDotsThreeCircle,
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiX,
} from "react-icons/pi";
import FilterCardModal from "../Flashcards/FilterFlashcardModal";
import { options } from "../../types/options.types";

interface SubHeaderProps {
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
  hasAddButton: boolean;
  onAdd?: () => void;
  onApplyOptions?: (options: options) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  isFlashCardsPage,
  isSectionTitleOnly,
  sectionTitle,
  hasAddButton,
  onAdd,
  onApplyOptions,
}) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText("");
  };

  // Open filter modal
  const openFilter = () => {
    setIsFilterOpen(true);
  };

  // Close filter modal
  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  // Safe handling of the apply options prop
  const handleApplyOptions = (selectedOptions: options) => {
    console.log("Options applied:", selectedOptions);
    if (onApplyOptions) {
      onApplyOptions(selectedOptions); // Call the function if it exists
    } else {
      console.log("onApplyOptions function not passed");
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
                <button
                  className="flex py-5 px-16 border-2 border-black bg-[#03c04a] rounded-[50px] gap-2 hover:bg-gray-200"
                  onClick={() => console.log("quiz clicked")} // Placeholder
                >
                  <PiCards size={30} /> Quiz
                </button>
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
                    onChange={(e) => setSearchText(e.target.value)} // Handle input change
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
                  onApply={handleApplyOptions} // Pass the handler to the modal
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
