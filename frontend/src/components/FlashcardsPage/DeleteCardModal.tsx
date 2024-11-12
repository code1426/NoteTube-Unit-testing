interface DeleteCardModalProps {
  onClose: () => void;
}

const DeleteCardModal = ({ onClose }: DeleteCardModalProps) => {
  return (
    <div className="absolute top-12 right-0 z-50 bg-white p-4 rounded-lg shadow-lg w-[250px] border border-gray-300">
      <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
      <p className="mb-4 text-sm">Are you sure you want to delete this card?</p>
      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={() => {
            onClose();
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={onClose}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteCardModal;
