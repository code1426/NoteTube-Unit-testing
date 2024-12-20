const Footer = () => (
  <footer className="bg-green-800 text-white py-12">
    <div className="container mx-auto px-12">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">NoteTube</h2>
          <p className="text-sm">
            AI-powered tool for notes, flashcards, and decks. Upload your notes
            and generate videos and learning material effortlessly.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-green-700 text-center">
        <p>&copy; {new Date().getFullYear()} NoteTube. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
