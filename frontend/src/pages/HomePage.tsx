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
    <div className="relative w-full min-h-screen bg-white overflow-auto scrollbar-custom h-screen">
      <Header isHomePage={true} username={user.username} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        addCard={false}
        sectionTitle="Upload Notes"
      />
      <TextInputSection />
    </div>
  );
};

export default HomePage;
