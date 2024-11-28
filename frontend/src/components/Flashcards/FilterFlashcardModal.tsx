import { IoIosClose } from "react-icons/io";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
interface FilterCardModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FilterCardModal = ({ onClose }: FilterCardModalProps) => {
  const ClearAll = () => {
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "Latest";
    });
  };
  return (
    <div className="absolute top-12 right-0 z-50 bg-white p-4 rounded-lg shadow-lg w-[350px]  border border-gray-300 grid ">
      <div className="grid grid-cols-2">
        <h1 className="mt-1 font-bold mb-2 self-start justify-self-start">
          Filter
        </h1>
        <button
          className="self-start justify-self-end"
          onClick={() => {
            onClose();
          }}
        >
          <IoIosClose size={45} />
        </button>
      </div>
      <div className="border-2 border-black p-2">
        <div className="grid grid-cols-2 ">
          <h2 className="ml-1 flex justify-center">Name</h2>
          <div className="grid grid-cols-2">
            <button
              name="descending"
              className="flex justify-center"
              onClick={() => {
                console.log("dfjwie");
              }}
            >
              <FaChevronDown />
            </button>
            <button name="ascending" className="flex justify-center ">
              <FaChevronUp />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-1 mb-2">
          <h2 className="ml-1 flex justify-center">Date</h2>
          <select name="dropdown" className="text-xl border-2 border-black">
            <option className="text-xl">Latest</option>
            <option className="text-xl">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 space-x-0.5 mt-5">
        <button
          className="bg-gray-300 text-xl text-black px-4 py-2  rounded-lg hover:bg-gray-400"
          onClick={ClearAll}
        >
          Clear All
        </button>
        <button
          className="bg-green text-xl text-black px-4 py-2 hover:bg-green_hover rounded-lg"
          onClick={() => {
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCardModal;
