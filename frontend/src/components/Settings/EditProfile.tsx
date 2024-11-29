import React from "react";

interface OverlayProps {
  onClose: () => void;
}

const EditProfile: React.FC<OverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-96 text-center border-green border-4">
        <h2 className="text-3xl font-bold mb-4 text-green font-secondaryRegular">
          Edit Profile
        </h2>
        <p className="text-gray-600 mb-4">Contents here.</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
