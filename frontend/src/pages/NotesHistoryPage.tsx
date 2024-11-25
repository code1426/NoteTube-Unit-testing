import UseUser from "../hooks/useUser";
import NotesHistoryCard from "../components/History/HistoryCard";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";

const NotesHistoryPage = () => {
  const { user, loading } = UseUser();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header isHomePage={true} username={user.username} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        sectionTitle="Notes History"
      />
      <NotesHistoryCard />
    </div>
  );
};

export default NotesHistoryPage;
