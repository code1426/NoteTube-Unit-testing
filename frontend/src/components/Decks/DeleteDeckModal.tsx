interface DeleteDeckModalProps {
  id: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteDeckModal = ({
  onClose,
  onConfirmDelete,
}: DeleteDeckModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white border-2 w-[95%] max-w-[400px] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold font-secondaryRegular mb-4">
          Confirm Delete
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to delete this deck?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            onClick={onConfirmDelete}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDeckModal;
