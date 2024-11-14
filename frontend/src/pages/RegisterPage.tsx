import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-activity";
import "react-activity/src/Spinner/Spinner";

import { FormData, FormErrors } from "../types/user.types";
import useRegisterUser from "../hooks/useRegisterUser";

const RegisterPage = () => {
  const {
    submitData,
    loading,
    error: registerError,
    setError,
  } = useRegisterUser();

  const formInitialvalues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FormData>(formInitialvalues);
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: FormErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof FormErrors] = `Please fill out the ${(
          key[0].toUpperCase() + key.slice(1)
        ).replace(/([A-Z])/g, " $1")}.`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      // Submit here then clear form
      submitData(formData)
        .then(() => {
          toast.success("Registration successful!");
          setFormData(formInitialvalues);
        })
        .catch((error) => {
          toast.error(error.message);
          // setFormData(formInitialvalues);
        });
      // setFormData(formInitialvalues);
    }
  };

  return (
    <div className="main flex w-screen h-screen p-8 gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="section1 bg-green hidden flex-1 flex-col rounded-lg items-center justify-center gap-2 p-12 md:felx lg:flex xl-flex">
        <span className="text-white text-6xl font-semibold">NoteTube</span>
        <div className="text-black text-justify w-full text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et
          aliquam lectus. Integer at tellus consequat, egestas elit ac, eleifend
          erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          et aliquam lectus. Integer at tellus consequat, egestas elit ac,
          eleifend erat.
        </div>
      </div>

      <div className="form flex flex-1 flex-col gap-2 py-5 justify-between">
        <h1 className="register flex text-start text-green text-5xl font-semibold w-[92%]">
          Register
        </h1>
        <form className=" flex flex-col gap-2 w-[92%]" onSubmit={handleSubmit}>
          <div className="username-container flex flex-col gap-1 text-xl">
            <div className=" text-black">Username</div>
            <input
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.username || registerError?.field === "username"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="email-container flex flex-col gap-1 text-xl">
            <div className=" text-black">Email</div>
            <input
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.email || registerError?.field === "email"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="password-container flex flex-col gap-1 text-xl">
            <div className=" text-black">Password</div>
            <input
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.password || registerError?.field === "password"
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
          </div>

          <div className="confirm-container flex flex-col gap-1 text-xl">
            <div className=" text-black">Confirm password</div>
            <input
              type="password"
              className={`px-4 py-2 rounded-md border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.confirmPassword || registerError?.field === "password"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <p
              className={`text-red-500 text-sm ${errors.confirmPassword || "hidden"}`}
            >
              {errors.confirmPassword}
            </p>
          </div>

          <button
            type="submit"
            className="Submit-button flex bg-green rounded-full min-w-full h-15 py-4 text-center justify-center text-xl text-black transition-all hover:bg-green_hover active:scale-[0.98] mt-6"
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center mb-8">
          Already Have an account?
          <Link to="/login">
            <span className="text-green px-2 cursor-pointer">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
