import AuthProvider from "@/context/AuthProvider";
import UserProvider from "@/context/UserProvider";
import DecksProvider from "@/context/DecksProvider";
import NotesProvider from "@/context/NotesProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotesProvider>
      <DecksProvider>
        <UserProvider>
          <AuthProvider>{children}</AuthProvider>
        </UserProvider>
      </DecksProvider>
    </NotesProvider>
  );
};

export default MainProvider;
