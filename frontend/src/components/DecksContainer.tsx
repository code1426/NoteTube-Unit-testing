const DecksContainer = () => {
  return (
    <body className="flex flex-row items-center justify-center ">
      {/* <div id="title" className="flex mx-4 my-1 h-100 self-start w-100">
        <h1 className="text-1xl text-green-600">My Decks</h1>
      </div> */}
      <div className="flex flex-row">
        <div
          id="deck-container"
          className="flex flex-col mx-5 my-3 border h-48 w-72 rounded-3xl overflow-hidden"
        >
          <div
            id="deck-title"
            className="flex border-b p-3 text-2xl bg-green font-secondaryRegular text-white"
          >
            Decks-Name
          </div>
          <div id="contents" className="flex flex-col w-full h-full">
            <div
              id="percentage"
              className="flex border-8 border-green border-solid text-green m-2 w-20 h-20 rounded-full justify-center items-center self-center justify-self-center"
            >
              0%
            </div>
            <div
              id="footer"
              className="flex flex-row w-full h-auto p-2 justify-between"
            >
              <div
                id="deck-quantity"
                className="flex text-gray-500 font-secondaryRegular"
              >
                1004 deck(s)
              </div>
              <div
                id="date"
                className="flex text-gray-500 font-secondaryRegular"
              >
                10/23/24
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default DecksContainer;
