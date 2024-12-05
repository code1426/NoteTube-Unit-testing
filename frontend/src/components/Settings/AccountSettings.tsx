import React from "react";

interface OverlayProps {
  onClose: () => void;
}

const AccountSettings: React.FC<OverlayProps> = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center w-full">
      {/* Background overlay */}
      <div
        id="background-outside"
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        {/* Main container */}
        <div
          id="main-container"
          className="bg-white rounded-xl p-4 w-96 text-center border-green border-4"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold mb-4 text-green font-secondaryRegular">
            Account Settings
          </h2>
          <p className="text-gray-600 mb-4">
            Manage your account settings below:
          </p>

          {/* Settings options */}
          <div id="contents" className="p-2 space-y-2">
            <div
              id="change-email"
              className="border-4 border-green rounded-lg p-2 cursor-pointer hover:bg-green-100"
            >
              Change Email
            </div>
            <div
              id="change-password"
              className="border-4 border-green rounded-lg p-2 cursor-pointer hover:bg-green-100"
            >
              Change Password
            </div>
            <div
              id="delete-account"
              className="border-4 border-green rounded-lg p-2 cursor-pointer hover:bg-green-100"
            >
              Delete Account
            </div>
            <div
              id="switch-account"
              className="border-4 border-green rounded-lg p-2 cursor-pointer hover:bg-green-100"
            >
              Switch Account
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
