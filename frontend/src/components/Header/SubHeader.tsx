import { useState } from "react";
import {
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiX,
} from "react-icons/pi";
import FilterCardModal from "../Flashcards/FilterFlashcardModal";
import { Link } from "react-router-dom";

interface SubHeaderProps {
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
  hasAddButton: boolean;
  onAdd?: () => void;
  deckId?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  isFlashCardsPage,
  isSectionTitleOnly,
  sectionTitle,
  hasAddButton,
  onAdd,
  deckId,
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
  return (
    <div>
      <div className="subheader py-8 px-20 flex justify-between items-center select-none flex-col max-h-36 md:flex-row">
        <div className="text-black flex gap-3 font-secondaryRegular align-middle items-center text-responsive">
          <div className="block truncate max-w-96 text-responsive_header">
            {sectionTitle}
          </div>
        </div>

        {!isSectionTitleOnly && (
          <div className="flex text-3xl font-secondaryRegular space-x-5 justify-center items-center px-4">
            {isFlashCardsPage && (
              <div>
                <Link to={`/quiz/${deckId}`}>
                  <button className="flex py-1.5 px-8 border-2 border-black items-center justify-center bg-green rounded-[50px] gap-2 hover:bg-green_hover">
                    <PiCards className="text-responsive" /> Quiz
                  </button>
                </Link>
              </div>
            )}
            {hasAddButton && (
              <div>
                <button
                  className="flex py-2 px-8 border-2 border-[#03c04a] rounded-full gap-2 hover:bg-gray-200 items-center justify-center"
                  onClick={onAdd}
                >
                  <PiPlus className="text-responsive" />{" "}
                  <p className="text-responsive">Add</p>
                </button>
              </div>
            )}
            <div>
              {isSearchActive ? (
                <div className="flex items-center gap-2 border-2 border-[#03c04a] rounded-full px-4 py-1.5">
                  <button
                    onClick={handleSearch}
                    className="text-black hover:bg-gray-200 rounded-full p-1"
                  >
                    <PiX className="text-responsive" />
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
                  <PiMagnifyingGlass className="text-responsive" />{" "}
                  <p className="text-responsive">Search</p>
                </button>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center hover:underline gap-2"
                onClick={openFilter}
              >
                <PiFunnel className="text-responsive" />{" "}
                <p className="text-responsive">Filter</p>
              </button>
              {isFilterOpen && <FilterCardModal onClose={closeFilter} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
