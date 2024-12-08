import React, { useState } from "react";
import useEditUser from "@/hooks/Profile/useEditUser";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const UpdatePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { updatePassword, loading, error, success } = useEditUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New Password and Confirm New Password do not match.");
      return;
    }

    await updatePassword(currentPassword, newPassword, confirmNewPassword);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <DialogDescription>
          Please fill out the fields below to update your password.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-green py-2 rounded-lg hover:bg-green hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Password updated successfully!</p>
      )}
    </DialogContent>
  );
};

export default UpdatePasswordForm;
