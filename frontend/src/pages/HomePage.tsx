import Header from "../components/Header/Header";
import TextInputSection from "../components/TextInputSection";
import SubHeader from "../components/Header/SubHeader";
import Deck from "../components/MyDecks/Deck";

import UseUser from "../hooks/useUser";
import LoadingScreen from "../components/LoadingScreen";

interface Props {
  setAuth: (value: boolean) => void;
}

const HomePage = ({ setAuth }: Props) => {

  const { user, loading } = UseUser();

  // temporarily used in the header user icon for testing purposes
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  if (loading || !user) {
    return <LoadingScreen />
  }

  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={true} username={user.username} logout={logout} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle="Upload Notes"
      />
      <TextInputSection />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        sectionTitle="My Decks"
      />
      <div className="w-screen flex px-20 gap-5">
        <Deck deckName="Deck1" deckCardsCount={50} />
        <Deck deckName="Deck2" deckCardsCount={100} />
        <Deck deckName="Deck3" deckCardsCount={0} />
        <Deck deckName="Deck4" deckCardsCount={1} />
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default HomePage;
