const LoginPage = () => {
  return (
    <div className="main flex w-screen h-screen p-8 gap-8">
      <div className="section1 bg-green hidden flex-1 flex-col rounded-lg items-center justify-center gap-2 p-12 md:flex lg:flex xl:flex">
        <span className="text-white text-6xl font-semibold">NoteTube</span>
        <div className="text-black w-full text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et
          aliquam lectus. Integer at tellus consequat, egestas elit ac, eleifend
          erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          et aliquam lectus. Integer at tellus consequat, egestas elit ac,
          eleifend erat.
        </div>
      </div>

      <div className="form flex flex-1 flex-col gap-6 items-center py-6 justify-center">
        <h1 className="register flex text-start text-green text-5xl font-semibold w-[92%]">
          Welcome Back!
        </h1>
        <form className=" flex flex-col gap-3 w-[92%]" onSubmit={() => {}}>
          <div className="username-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Username/Email</div>
            <input
              className="px-4 py-2 border-green rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              placeholder="Username/Email"
            />
          </div>

          <div className="password-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Password</div>
            <input
              className="px-4 py-2 border-green rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="flex flex-row justify-between">
            <div className="remember-me flex">
              <input className="accent-green w-5" type="checkbox" />
              <label className="ml-2 text-black ">Remember me</label>
            </div>

            <div className="">
              <span className="text-green cursor-pointer">
                Forgot Password?
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="Submit-button flex bg-green rounded-full py-4 text-center justify-center text-xl text-black transition-all hover:bg-green_hover mt-8"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center justify-center">
          Not yet registered?
          <span className="text-green px-2 cursor-pointer">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
