import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "../ui/input";

interface SearchCardModalProps {
  onClose: () => void;
  onSearch: (searchText: string) => void;
}

const SearchCardModal = ({ onClose, onSearch }: SearchCardModalProps) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
    onClose();
  };

  return (
    <Card className="flex-grow absolute top-12 right-0 z-50 bg-white p-2 rounded-lg shadow-lg w-[20rem] border border-gray-300 mr-7">
      {/* Header */}
      <CardHeader className="grid grid-cols-2">
        <h2 className="self-start">Search</h2>
        <button
          className="self-start justify-self-end text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <IoIosClose size={24} />
        </button>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Type to search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 transition-all focus:ring-offset-2 focus:ring-green"
        />
      </CardContent>

      {/* Footer */}
      <CardFooter className="justify-end">
        <button
          className="bg-green hover:bg-green_hover text-sm font-medium text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </CardFooter>
    </Card>
  );
};

export default SearchCardModal;
