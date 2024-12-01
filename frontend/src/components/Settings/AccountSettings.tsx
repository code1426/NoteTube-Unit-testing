import React from "react";

//change password
//switch account
//delete account
//change email
interface OverlayProps {
  onClose: () => void;
}

const AccountSettings: React.FC<OverlayProps> = ({ onClose }) => {
  return (
    <div
      id="background-outside"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        id="main-container"
        className="bg-white rounded-xl p-4 w-96 text-center border-green border-4"
      >
        <h2 className="text-3xl font-bold mb-4 text-green font-secondaryRegular">
          Account Settings
        </h2>
        <p className="text-gray-600 mb-4">Contents here.</p>
        <div id="contents" className="p-2">
          <div id="change-email" className="border-4 border-green my-2">
            Change Email
          </div>
          <div id="change-password" className="border-4 border-green my-2">
            Change Password
          </div>
          <div id="delete-account" className="border-4 border-green my-2">
            Delete Account
          </div>
          <div id="switch-account" className="border-4 border-green my-2">
            Switch Account
          </div>
        </div>
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

export default AccountSettings;
