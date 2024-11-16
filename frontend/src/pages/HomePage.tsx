import Header from "../components/Header/Header";
import TextInputSection from "../components/TextInputSection";
import SubHeader from "../components/Header/SubHeader";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={true} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle="Upload Notes"
      />
      <TextInputSection />
      <Link to={"/decks"}>
        <button>My Decks</button>
      </Link>
    </div>
  );
};

export default HomePage;
