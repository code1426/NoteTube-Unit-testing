import { IoIosClose } from "react-icons/io";
import { options } from "../../types/options.types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterCardModalProps {
  onClose: () => void;
  onApply: (options: options) => void;
}

const FilterCardModal = ({ onClose, onApply }: FilterCardModalProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleApply = () => {
    const [sortBy, direction] = sortOption.split("-");
    const newOptions: options = {
      sortByDate: sortBy === "date" ? direction : "",
      sortByNames: sortBy === "name" ? direction : "",
      searchByName: "",
    };
    onApply(newOptions);
    onClose();
  };

  return (
    <Card className="flex-grow absolute top-12 right-0 z-50 bg-white p-2 rounded-lg shadow-lg w-[20rem] border border-gray-300">
      {/* Header */}
      <CardHeader className="grid grid-cols-2 ">
        <h2 className="self-start">Filter</h2>
        <button
          className="self-start justify-self-end  text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <IoIosClose size={24} />
        </button>
      </CardHeader>

      {/* Content */}
      <CardContent className="grid grid-cols-3 gap-2 items-center">
        <h2 className="col-span-1 text-lg font-medium text-gray-700">
          Sort By
        </h2>
        <div className="col-span-2">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger className="w-full rounded-md border border-gray-300 shadow-sm row-span-1">
              <SelectValue className="text-black" placeholder="Select Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-latest">Date: Latest</SelectItem>
              <SelectItem value="date-oldest">Date: Oldest</SelectItem>
              <SelectItem value="name-ascending">Name: A-Z</SelectItem>
              <SelectItem value="name-descending">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="justify-end">
        <button
          className="justify-end bg-green hover:bg-green_hover text-sm font-medium text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleApply}
        >
          Apply
        </button>
      </CardFooter>
    </Card>
  );
};

export default FilterCardModal;
