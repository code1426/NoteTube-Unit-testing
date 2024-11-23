import { IoIosClose } from "react-icons/io";
interface FilterCardModalProps {
  onClose: () => void;
}

const FilterCardModal = ({ onClose }: FilterCardModalProps) => {
  const ClearAll = () => {
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "None";
    });
  };
  return (
    <div className="absolute top-12 right-0 z-50 bg-white p-4 rounded-lg shadow-lg w-[450px]  border border-gray-300 grid ">
      <div className="grid grid-cols-2">
        <h2 className="text-lg font-bold mb-2">Filter</h2>
        <button
          className="self-start justify-self-end"
          onClick={() => {
            onClose();
          }}
        >
          <IoIosClose size={30} />
        </button>
      </div>
      <div className="grid grid-cols-2">
        <h3>Status</h3>
        <select name="dropdown">
          <option>None</option>
          <option>Done</option>
          <option>In Progress</option>
        </select>
      </div>
      <div className="grid grid-cols-2">
        <h3>Category</h3>
        <select name="dropdown">
          <option value={"None"}>None</option>
          <option>Calculus</option>
        </select>
      </div>
      <div className="grid grid-cols-2">
        <h3>Date</h3>
        <select name="dropdown">
          <option>None</option>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>
      <br></br>
      <div className="grid grid-cols-3 space-x-0.5">
        <button
          className="bg-gray-300 text-black px-4 py-2  rounded-lg hover:bg-gray-400"
          onClick={ClearAll}
        >
          Clear All
        </button>
        <button
          className="bg-red-500 text-black px-5 py-2 hover:bg-red-700  rounded-lg "
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <button className="bg-green text-black px-4 py-2 hover:bg-green_hover rounded-lg">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCardModal;
