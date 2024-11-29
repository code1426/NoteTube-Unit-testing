interface DeleteCardModalProps {
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteCardModal = ({
  onClose,
  onConfirmDelete,
}: DeleteCardModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white border-2 border-[#03c04a] w-60 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-2 font-secondaryRegular">
          Confirm Delete
        </h2>
        <p className="mb-4 text-sm">
          Are you sure you want to delete this card?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={onConfirmDelete}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
