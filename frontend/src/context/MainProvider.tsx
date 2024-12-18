import AuthProvider from "@/context/AuthProvider";
import UserProvider from "@/context/UserProvider";
import DecksProvider from "@/context/DecksProvider";
import NotesProvider from "@/context/NotesProvider";
import FlashcardsProvider from "@/context/FlashcardsProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlashcardsProvider>
      <NotesProvider>
        <DecksProvider>
          <UserProvider>
            <AuthProvider>{children}</AuthProvider>
          </UserProvider>
        </DecksProvider>
      </NotesProvider>
    </FlashcardsProvider>
  );
};

export default MainProvider;
