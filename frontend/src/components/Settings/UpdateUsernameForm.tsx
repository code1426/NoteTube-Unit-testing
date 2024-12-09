import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateUsername from "@/hooks/User/useUpdateUsername";
import useUser from "@/hooks/auth/useUser";
import { User } from "@/types/user.types";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const UpdateUsernameForm = () => {
  const { user } = useUser();
  const [newwUsername, setNewUsername] = useState(user?.username || "");
  const { newUsername, loading, error } = useUpdateUsername();
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = async () => {
    if (!newwUsername || newwUsername === user?.username) return;
    const result = await newUsername({
      ...user,
      username: newwUsername.trim(),
    } as User);

    if (result.success) {
      console.log("Saved:", { username: result.user?.username });
      setIsOpen(false);
      toast.success("Username changed");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Username already exists.");
    }
  }, [error]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CiEdit size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Username</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={newwUsername}
              placeholder="Enter a new username"
              onChange={(e) => setNewUsername(e.target.value)}
              className="col-span-3"
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={handleApply}
            disabled={
              loading || !newwUsername || newwUsername === user?.username
            }
            className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-black btn-primary"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUsernameForm;
