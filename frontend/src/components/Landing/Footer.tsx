import { Separator } from "../ui/separator";

const Footer = () => (
  <div className="bg-white bg-opacity-85">
    <footer className="bg-gray-800 rounded-t-3xl text-white py-8 p-10 w-screen">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">NoteTube</h2>
        <p className="text-sm m-2">
          AI-powered tool for notes, flashcards, and decks. Upload your notes
          and generate videos and learning material effortlessly.
        </p>
        <Separator className="my-4 bg-white" />
        <p>&copy; {new Date().getFullYear()} NoteTube. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export default Footer;
