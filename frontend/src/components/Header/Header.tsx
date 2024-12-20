import { useState } from "react";
import {
  PiCards,
  PiPlus,
  PiMagnifyingGlass,
  PiX,
  PiArrowsDownUpLight,
} from "react-icons/pi";
import { PiArrowCircleLeftBold } from "react-icons/pi";
import FilterCardModal from "../Flashcards/FilterFlashcardModal";
import { Link, useNavigate } from "react-router-dom";
import { options } from "../../types/options.types";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchCardModal from "./SearchModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SubHeaderProps {
  isHomepage: boolean;
  isFlashCardsPage: boolean;
  isSectionTitleOnly: boolean;
  sectionTitle: string;
  hasAddButton: boolean;
  onAdd?: () => void;
  deckId?: string;
  deckName?: string;
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
  deckName,
  onApplyOptions,
  onSearch,
}) => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prevState) => !prevState);
  };

  const handleSearch = () => {
    if (isMobile) {
      toggleSearchModal();
    } else {
      const toggledSearchState = !isSearchActive;
      setIsSearchActive(toggledSearchState);
      if (!toggledSearchState) {
        setSearchText("");
        if (onSearch) onSearch("");
      }
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
    <>
      <TooltipProvider>
        <div className="sticky top-0 pt-16 bg-white dark:bg-dark-background mb-4 w-full z-20">
          <div className="subheader h-16 w-full flex flex-row justify-between items-center select-none">
            <div className="text-black dark:text-white flex font-secondaryRegular items-center text-responsive">
              {!isHomepage && (
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="hover:bg-gray-200 hover:dark:bg-dark-foreground ml-4 rounded-full text-responsive m-auto"
                      onClick={handleBack}
                    >
                      <PiArrowCircleLeftBold className="m-auto text-3xl sm:text-3xl sm-md:4xl md:text-4xl lg:text-5xl" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back to previous page</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <div
                className={`max-w-36 ${sectionTitle === "Generated Videos" && "max-w-full"} ${!isSearchActive ? "md:max-w-[660px] lg:max-w-[660px] xl:max-w-[660px]" : "md:max-w-[412px] lg:max-w-[412px] xl:max-w-[412px]"} block truncate ml-4 w-full text-responsive_header`}
              >
                {sectionTitle}
              </div>
            </div>

            {!isSectionTitleOnly && (
              <div className="flex text-2xl font-secondaryRegular space-x-4 justify-end items-center mr-6">
                {isFlashCardsPage && (
                  <div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to={`/quiz/${deckId}`} state={{ deckName }}>
                          <button
                            className={`hidden md:flex lg:flex xl:flex py-2 px-8 text-white items-center justify-center bg-green rounded-[50px] gap-2 hover:bg-green_hover`}
                          >
                            <PiCards /> Quiz
                          </button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quiz the current deck</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
                {hasAddButton && (
                  <div>
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          className={`flex py-2 px-2 md:px-6 lg:px-6 xl:px-6 border-2 border-[#03c04a] rounded-full gap-2 hover:dark:bg-dark-foreground hover:bg-gray-200 items-center justify-center`}
                          onClick={onAdd}
                        >
                          <PiPlus />{" "}
                          <p
                            className={`text-responsive hidden md:flex lg:flex xl:flex`}
                          >
                            Add
                          </p>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add item</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
                <div>
                  {/* Search bar toggle */}
                  {isMobile ? (
                    <button
                      className={`flex items-center hover:underline gap-2 ${sectionTitle === "Quiz" && "hidden"}`}
                      onClick={handleSearch}
                    >
                      <PiMagnifyingGlass />{" "}
                    </button>
                  ) : isSearchActive ? (
                    <div className="flex items-center gap-2 border-2 border-[#03c04a] rounded-full px-4 py-1.5">
                      <button
                        onClick={handleSearch}
                        className="text-black dark:text-white hover:bg-gray-200 rounded-full p-1"
                      >
                        <PiX className="text-responsive" />
                      </button>
                      <input
                        type="text"
                        value={searchText}
                        placeholder="Search..."
                        className="flex-1 focus:outline-none dark:bg-dark-background"
                        autoFocus
                        onChange={(e) => {
                          const newSearchText = e.target.value;
                          setSearchText(newSearchText);
                          if (onSearch) {
                            onSearch(newSearchText);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          className={`flex items-center hover:underline gap-2 ${sectionTitle === "Quiz" && "hidden"}`}
                          onClick={handleSearch}
                        >
                          <PiMagnifyingGlass />{" "}
                          <p
                            className={`text-responsive hidden md:flex lg:flex xl:flex`}
                          >
                            Search
                          </p>
                        </button>
                        <TooltipContent>
                          <p>Search</p>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                </div>

                {/* Filter button */}
                <div
                  className={`relative ${sectionTitle === "Quiz" && "hidden"}`}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        className="flex items-center justify-center hover:underline gap-2"
                        onClick={openFilter}
                      >
                        <PiArrowsDownUpLight />
                        <p
                          className={`text-responsive hidden md:flex lg:flex xl:flex`}
                        >
                          Sort
                        </p>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open Sort</p>
                    </TooltipContent>
                  </Tooltip>
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

          {isSearchModalOpen && (
            <SearchCardModal
              onClose={() => toggleSearchModal()}
              onSearch={(searchText) => {
                setSearchText(searchText);
                if (onSearch) onSearch(searchText);
              }}
            />
          )}
        </div>
      </TooltipProvider>
    </>
  );
};

export default Header;
