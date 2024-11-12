import Header from "../components/Header/Header";
import TextInputSection from "../components/TextInputSection";

const HomePage = () => {
  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={true} />
      <div className="header-bottom w-full px-20 pt-20 pb-10 bg-white flex justify-between items-center">
        <div className="text-black text-2xl md:text-5xl lg:text-5xl font-secondaryRegular">
          Upload Notes
        </div>
      </div>
      <TextInputSection />
      <div className="text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
        <div>Flashcards</div>
      </div>
    </div>
  );
};

export default HomePage;
