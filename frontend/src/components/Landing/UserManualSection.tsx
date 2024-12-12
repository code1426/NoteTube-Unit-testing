import { PiArrowRight } from "react-icons/pi";
import UserManualCard from "./UserManualCard";

const UserManualSection = () => {
  return (
    <div className="bg-green bg-opacity-85 py-16 px-8 select-none">
      <h2 className="text-6xl font-secondaryRegular text-white text-center mb-16 px-52">
        <div className="bg-lime-400">How It Works</div>
      </h2>
      <div className="flex items-center justify-center space-x-8">
        <UserManualCard
          image="/src/assets/images/upload.png"
          alt="Upload Notes"
          title="1. Upload"
          description="Easily upload your notes in various formats - PDFs, images, text documents"
        />
        <PiArrowRight size={50} color="white" />
        <UserManualCard
          image="/src/assets/images/generate.png"
          alt="Generate Content"
          title="2. Generate"
          description="Get auto-generated summaries, relevant videos, and interactive flashcards"
        />
        <PiArrowRight size={50} color="white" />
        <UserManualCard
          image="/src/assets/images/review.png"
          alt="Review Content"
          title="3. Review"
          description="Review and interact with AI-generated content to enhance yourlearning"
        />
      </div>
    </div>
  );
};

export default UserManualSection;
