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

  const handleApply = async () => {
    if (!newwUsername || newwUsername === user?.username) {
      toast.error("New username should be different.");
      return;
    }

    if (newwUsername.length < 3 || newwUsername.length > 254) {
      toast.error("Username must be between 3 and 254 characters.");
      return;
    }

    const result = await newUsername({
      ...user,
      username: newwUsername.trim(),
    } as User);

    if (result.success) {
      // setIsOpen(false);
      toast.success("Username changed");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (error?.includes("400")) {
      toast.error("Username already exists.");
    }
  }, [error]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CiEdit size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-dark-background">
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
              autoFocus
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
            disabled={loading || !newwUsername}
            className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-green hover:bg-green_hover btn-primary"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUsernameForm;
