import React from "react";

interface OverlayProps {
  onClose: () => void;
}

const EditProfile: React.FC<OverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Main Container */}
      <div className="bg-white rounded-xl p-6 w-96 text-center border-green border-4">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-green font-secondaryRegular">
          Edit Profile
        </h2>

        {/* Instructions */}
        <p className="text-gray-600 mb-6">
          Customize your profile using the options below:
        </p>

        {/* Edit Options */}
        <div className="space-y-4">
          <div
            id="change-username"
            className="border-4 border-green rounded-lg p-3 cursor-pointer hover:bg-green-100"
          >
            Change Username
          </div>
          <div
            id="change-profile-picture"
            className="border-4 border-green rounded-lg p-3 cursor-pointer hover:bg-green-100"
          >
            Change Profile Picture
          </div>
          <div
            id="change-cover-picture"
            className="border-4 border-green rounded-lg p-3 cursor-pointer hover:bg-green-100"
          >
            Change Cover Picture
          </div>
          <div
            id="change-bio"
            className="border-4 border-green rounded-lg p-3 cursor-pointer hover:bg-green-100"
          >
            Change Bio
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
