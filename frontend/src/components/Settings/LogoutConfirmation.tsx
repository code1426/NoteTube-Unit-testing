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
import { ReactNode, useContext } from "react";
import {
  AuthContext,
  DecksContext,
  ThemeContext,
  UserContext,
} from "@/context/Contexts";

interface Props {
  children: ReactNode;
}

const LogoutConfirmation = ({ children }: Props) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { setDecks } = useContext(DecksContext);

  const resetState = () => {
    setUser({ email: "", username: "", id: "" });
    setDecks([]);
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    setTheme("light");
    localStorage.removeItem("hasShownBanner");
    localStorage.removeItem("token");
    resetState();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent title="log out" className="dark:bg-dark-background">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll need to sign back in to access your account again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmation;
