import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDeleteUser from "@/hooks/User/useDeleteUser";
import useUser from "@/hooks/auth/useUser";
import toast from "react-hot-toast";

const DeleteUserForm = () => {
  const { user } = useUser();
  const { deleteUser, loading, error } = useDeleteUser();
  const handleDelete = async () => {
    const result = await deleteUser(user!);
    if (result.success) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    if (error) {
      toast.error("Error Deleting account");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>Delete Account</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green text-white hover:bg-green_hover hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-700 text-white hover:bg-red-900 "
          >
            {loading ? "Deleting..." : "DELETE ACCOUNT"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteUserForm;
