import AuthProvider from "@/context/AuthProvider";
import UserProvider from "@/context/UserProvider";
import DecksProvider from "@/context/DecksProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DecksProvider>
      <UserProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserProvider>
    </DecksProvider>
  );
};

export default MainProvider;
