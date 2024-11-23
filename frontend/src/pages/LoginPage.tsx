import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-activity";

import { LoginData } from "../types/user.types";
import useAuth from "../hooks/useAuth";

interface Props {
  setAuth: (auth: boolean) => void;
}

const LoginPage = ({ setAuth }: Props) => {
  const {
    submitData,
    loading,
    error: loginError,
    setError: setLoginError,
  } = useAuth("login");

  const formInitialvalues = {
    usernameEmail: "",
    password: "",
  };

  const [formData, setFormData] = useState<LoginData>(formInitialvalues);
  const [errors, setErrors] = useState<LoginData>({
    usernameEmail: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear errors when user types/selects a value
    if (e.target.value !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
      setLoginError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: LoginData = {
      usernameEmail: "",
      password: "",
    };

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof LoginData] = `Please fill out the ${(
          key[0].toUpperCase() + key.slice(1)
        ).replace(/([A-Z])/g, " $1")}.`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      submitData(formData)
        .then(() => {
          toast.success("Login successful!");
          setFormData(formInitialvalues);
          setTimeout(() => {
            setAuth(true);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="main flex w-screen h-screen p-8 gap-8">
      <Toaster position="top-center" reverseOrder={false} />
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
        <h1 className="login font-primaryRegular flex text-start text-green text-5xl font-semibold w-[92%]">
          Welcome Back!
        </h1>
        <form className=" flex flex-col gap-3 w-[92%]" onSubmit={handleSubmit}>
          <div className="email-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Username/Email</div>
            <input
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.usernameEmail || loginError?.field === "both"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              type="text"
              placeholder="Username or Email"
              name="usernameEmail"
              value={formData.usernameEmail}
              onChange={handleChange}
            />
            {errors.usernameEmail && (
              <p className="text-red-500 text-sm">{errors.usernameEmail}</p>
            )}
          </div>

          <div className="password-container flex flex-col gap-2 text-xl">
            <div className=" text-black">Password</div>
            <input
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.password || loginError?.field === "both"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* <div className="flex flex-row justify-between">
              <div className="remember-me flex">
                <input className="accent-green w-5" type="checkbox" />
                <label className="ml-2 text-black ">Remember me</label>
              </div>

              <div className="">
                <span className="text-green cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            </div> */}
          </div>

          <button
            type="submit"
            className="Submit-button flex bg-green rounded-full min-w-full h-14 items-center py-4 text-center justify-center text-xl text-black transition-all hover:bg-green_hover mt-8"
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center">
          Not yet registered?
          <Link to="/register">
            <span className="text-green px-2 cursor-pointer">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
