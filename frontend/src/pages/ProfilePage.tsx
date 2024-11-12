const ProfilePage = () => {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center ">
      <div className="bg-white w-full h-full grid place-items-center">
        <div className="w-[60vh] h-[73vh] bg-green grid place-items-center rounded-2xl  overflow-hidden">
          <div className=" m-3 bg-white  h-[50vh] rounded-2xl">
            <div className="w-full h-full p-2 flex justify-start content-center items-center">
              <div className="w-1/2 h-2/3 bg-green rounded-full m-5 p-5"></div>
              <div className="bg-white w-full h-full grid place-items-center">
                <div className="self-end justify-start text-green text-5xl font-extrabold">
                  Joshua Samenian
                </div>
                <div className="self-start justify-self-start text-green text-2x1 font-bold">
                  JoshuaSamenian@gmail.com
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green w-full h-full">
            <div className="m-3 h-5/6 p-4 bg-white grid content-center items-center gap-4 rounded-xl">
              <div className="bg-white w-full h-full grid grid-cols-2 gap-4 p-2">
                <button className="h-full w-full border-green rounded-2x1 border rounded font-extrabold text-white bg-green hover:bg-green_hover focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-90">
                  Account Status
                </button>
                <button className="h-full w-full border-green rounded-2x1 border rounded font-extrabold text-white bg-green hover:bg-green_hover focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-90">
                  My Decks
                </button>
              </div>
              <div className="bg-white w-full h-full grid grid-cols-2 gap-4 p-2">
                <button className="h-full w-full border-green rounded-2x1 border rounded font-extrabold text-white bg-green hover:bg-green_hover focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-90">
                  Edit Profile
                </button>
                <button className="h-full w-full border-green rounded-2x1 border rounded font-extrabold text-white bg-green hover:bg-green_hover focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-90">
                  Payment Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
