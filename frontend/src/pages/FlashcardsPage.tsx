import Header from "../components/Header/Header";
import SubHeader from "../components/SubHeader";
import Card from "../components/FlashcardsPage/Card";
import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiTrash,
  PiUpload,
} from "react-icons/pi";
import TextInputSection from "../components/TextInputSection";

function FlashcardsPage() {
  return (
    <div className="w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={false} />
      <SubHeader />
      <TextInputSection />
      <div className="px-20">
        <div className="pb-20 text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          Cards
        </div>
        <div className="space-y-5">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;
