import UseUser from "../hooks/useUser";
import NotesHistoryCard from "../components/History/HistoryCard";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";

const NotesHistoryPage = () => {
  const { user, loading } = UseUser();

  const items = [
    { date: "mm/mm/mm", name: "Placeholder" },
    { date: "mm/mm/mm", name: "Placeholder" },
    { date: "mm/mm/mm", name: "Placeholder" },
    { date: "mm/mm/mm", name: "Placeholder" },
  ];

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative bg-white select-none overflow-auto scrollbar-custom h-screen">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        hasAddButton={false}
        sectionTitle="Notes History"
      />
      <NotesHistoryCard />
      <div>
        {items!.length === 0 ? (
          <p>NO NOTES DETECTED.</p>
        ) : (
          items!.map((note) => <NotesHistoryCard />)
        )}
      </div>
    </div>
  );
};

export default NotesHistoryPage;
