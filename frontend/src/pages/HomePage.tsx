import Header from "../components/Header/Header";
import TextInputSection from "../components/TextInputSection";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";
import { Toaster } from "react-hot-toast";

import UseUser from "../hooks/useUser";
import generateAIResponse from "../utils/generateAIResponse";

const HomePage = () => {
  const { user, loading } = UseUser();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster />
      <div className="relative w-full min-h-screen bg-white overflow-auto flex flex-col scrollbar-custom h-screen">
        <Header isHomePage={true} username={user.username} />
        <SubHeader
          isFlashCardsPage={false}
          isSectionTitleOnly={true}
          hasAddButton={false}
          sectionTitle="Upload Notes"
        />
        {/* for debugging only, TO DO: Change onsubmit funciton to useCreateNote */}
        <TextInputSection onSubmit={generateAIResponse} />
      </div>
    </>
  );
};

export default HomePage;
