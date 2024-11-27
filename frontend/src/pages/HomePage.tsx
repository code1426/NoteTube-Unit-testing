import Header from "../components/Header/Header";
import TextInputSection from "../components/TextInputSection";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";

import UseUser from "../hooks/useUser";

const HomePage = () => {
  const { user, loading } = UseUser();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full h-auto min-h-screen bg-white">
      <Header isHomePage={true} username={user.username} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle="Upload Notes"
      />
      <TextInputSection />
    </div>
  );
};

export default HomePage;
