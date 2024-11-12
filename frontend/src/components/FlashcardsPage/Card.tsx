import { PiPencil, PiTrash } from "react-icons/pi";
import { useState } from "react";
import DeleteCardModal from "./DeleteCardModal";

const Card = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditCard = () => {
    return;
  };

  const handleDeleteCard = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-5 rounded-lg border-4 border-[#03c04a] flex flex-col relative">
      <div className="flex justify-between text-2xl font-secondaryRegular mb-4">
        <div>Card Topic</div>
        <div className="flex">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleEditCard}
          >
            <PiPencil size={30} />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleDeleteCard}
          >
            <PiTrash size={30} />
          </button>
        </div>
      </div>
      <div className="w-full border-t-2 border-gray-300 mb-3"></div>
      <div className="text-2xl font-secondaryRegular text-gray-700">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam iste
        est aspernatur, labore autem illo nemo voluptate reiciendis nihil animi
        quas corrupti maxime nobis, consectetur, tenetur reprehenderit
        repudiandae? Dolor, provident.
      </div>

      {isModalOpen && <DeleteCardModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Card;
