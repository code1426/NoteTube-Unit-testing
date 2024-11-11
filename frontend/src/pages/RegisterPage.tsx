const RegisterPage = () => {
  return (
    <div className="main flex flex-row w-screen h-screen p-8 gap-8">
      <div className="section1 bg-green flex flex-1 flex-col rounded-lg items-center justify-center gap-2 ">
        <span className="text-white text-6xl font-semibold">NoteTube</span>
        <div className="text-black text-justify w-3/4 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et
          aliquam lectus. Integer at tellus consequat, egestas elit ac, eleifend
          erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          et aliquam lectus. Integer at tellus consequat, egestas elit ac,
          eleifend erat.
        </div>
      </div>

      <div className="form flex flex-1 flex-col gap-6 p-6">
        <h1 className="register flex text-start text-green text-5xl font-semibold">
          Register
        </h1>
        <form className=" flex flex-col gap-5" onSubmit={() => {}}>
          <div className="username-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Username</div>
            <input
              className="px-4 py-2 border-green rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="email-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Email</div>
            <input
              className="px-4 py-2 border-green rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              placeholder="Email"
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

          <div className="confirm-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Confirm Password</div>
            <input
              type="password"
              className="px-4 py-2 border-green rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="Submit-button flex bg-green rounded-full py-4 text-center justify-center text-xl text-black transition-all hover:bg-green_hover"
          >
            Sign Up
          </button>
        </form>

        <div className="flex flex-1 items-center justify-center">
          Already Have an account?
          <span className="text-green px-2 cursor-pointer">Log in</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
