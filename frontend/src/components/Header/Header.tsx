import { useState } from "react";
import {
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiFunnel,
  PiX,
} from "react-icons/pi";
import { PiArrowCircleLeftBold } from "react-icons/pi";
import FilterCardModal from "../Flashcards/FilterFlashcardModal";
import { Link, useNavigate } from "react-router-dom";
import { options } from "../../types/options.types";
import { useIsMobile } from "@/hooks/use-mobile";

interface SubHeaderProps {
  isHomepage: boolean;
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
  hasAddButton: boolean;
  onAdd?: () => void;
  deckId?: string;
  onApplyOptions?: (options: options) => void;
  onSearch?: (searchText: string) => void;
}

const Header: React.FC<SubHeaderProps> = ({
  isHomepage,
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
  const isMobile = useIsMobile();

  const handleSearch = () => {
    const toggledSearchState = !isSearchActive;
    setIsSearchActive(toggledSearchState);
    if (!toggledSearchState) {
      setSearchText("");
      onSearch!("");
    }
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 mt-16 mb-4 w-full">
      <div className="subheader h-16 w-full flex flex-row justify-between items-center select-none">
        <div className="text-black flex font-secondaryRegular items-center text-responsive">
          {!isHomepage && (
            <button
              className="hover:bg-gray-200 rounded-full text-responsive m-auto"
              onClick={handleBack}
            >
              <PiArrowCircleLeftBold className="m-auto ml-4 text-3xl sm:text-3xl sm-md:4xl md:text-4xl lg:text-5xl" />
            </button>
          )}

          <div
            className={`${isMobile && "max-w-32"} block truncate ml-4 w-full text-responsive_header`}
          >
            {sectionTitle}
          </div>
        </div>

        {!isSectionTitleOnly && (
          <div className="flex text-2xl font-secondaryRegular space-x-4 justify-end items-center mr-4">
            {isFlashCardsPage && (
              <div>
                <Link to={`/quiz/${deckId}`}>
                  <button
                    className={` ${isMobile && "hidden"} flex py-2 px-8 text-white items-center justify-center bg-green rounded-[50px] gap-2 hover:bg-green_hover`}
                  >
                    <PiCards /> Quiz
                  </button>
                </Link>
              </div>
            )}
            {hasAddButton && (
              <div>
                <button
                  className={`flex py-2 ${isMobile ? "px-2" : "px-6"} border-2 border-[#03c04a] rounded-full gap-2 hover:bg-gray-200 items-center justify-center`}
                  onClick={onAdd}
                >
                  <PiPlus />{" "}
                  <p className={`text-responsive ${isMobile && "hidden"}`}>
                    Add
                  </p>
                </button>
              </div>
            )}
            <div>
              {/* Search bar toggle */}
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
                  <PiMagnifyingGlass />{" "}
                  <p className={`text-responsive ${isMobile && "hidden"}`}>
                    Search
                  </p>
                </button>
              )}
            </div>

            {/* Filter button */}
            <div className="relative">
              <button
                className="flex items-center hover:underline gap-2"
                onClick={openFilter}
              >
                <PiFunnel />{" "}
                <p className={`text-responsive ${isMobile && "hidden"}`}>
                  Filter
                </p>
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

export default Header;
