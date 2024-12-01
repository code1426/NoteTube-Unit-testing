import UseUser from "../hooks/auth/useUser";
import NotesHistoryCard from "../components/History/HistoryCard";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import LoadingScreen from "../components/LoadingScreen";
import { Note } from "../types/note.types";

const NotesHistoryPage = () => {
  const { user, loading } = UseUser();

  const items = [
    {
      id: "1234-5678-90",
      content: "note content",
      topic: "topic title",
      summary: "summary hahaha",
      createdAt: "mm/mm/mm",
      userId: "0",
    },
    {
      id: "1234-5678-90",
      content: "note content",
      topic: "topic title",
      summary: "summary hahaha",
      createdAt: "mm/mm/mm",
      userId: "0",
    },
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
      <div className="flex flex-col h-screen w-full justify-start items-center mb-8 gap-8 p-4 select-none">
        {items!.length === 0 ? (
          <p>NO NOTES DETECTED.</p>
        ) : (
          items!.map((note: Note) => (
            <NotesHistoryCard
              id={note.id}
              content={note.content}
              topic={note.topic}
              summary={note.summary}
              createdAt={note.createdAt}
              userId={note.userId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesHistoryPage;
