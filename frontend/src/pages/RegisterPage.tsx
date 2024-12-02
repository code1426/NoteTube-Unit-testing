import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

import { RegisterData } from "../types/user.types";
import useAuth from "../hooks/auth/useAuth";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import EyeButton from "@/components/EyeButton";

interface Props {
  setAuth: (value: boolean) => void;
}

const RegisterPage = ({ setAuth }: Props) => {
  const {
    submitData,
    loading,
    error: registerError,
    setError: setRegisterError,
  } = useAuth("register");

  const formInitialvalues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<RegisterData>(formInitialvalues);
  const [errors, setErrors] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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
      setRegisterError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: RegisterData = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasErrors = true;
    }

    // Check if any of the fields are empty
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof RegisterData] === "") {
        newErrors[key as keyof RegisterData] = `Please fill out the ${(
          key[0].toUpperCase() + key.slice(1)
        ).replace(/([A-Z])/g, " $1")}.`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) return;

    submitData(formData)
      .then(() => {
        toast.success("Registration successful!");
        setFormData(formInitialvalues);
        setTimeout(() => {
          setAuth(true);
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
        <h1 className="register font-primaryRegular flex text-start text-green text-5xl font-semibold w-[92%]">
          Register
        </h1>
        <form className=" flex flex-col gap-2 w-[92%]" onSubmit={handleSubmit}>
          <div className="username-container flex flex-col gap-1 text-lg">
            <Label className="text-black text-lg">Username</Label>
            <input
              className={`px-4 py-2 rounded-lg border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.username || registerError?.field === "username"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="email-container flex flex-col gap-1 text-lg">
            <Label className=" text-black text-lg">Email</Label>
            <input
              className={`px-4 py-2 rounded-lg border-2 bg-white focus:outline-none focus:ring-1 focus:ring-green  ${
                errors.email || registerError?.field === "email"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green"
              }`}
              type="text"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="password-container flex flex-col gap-1 text-lg">
            <Label className=" text-black text-lg">Password</Label>
            <div
              tabIndex={0}
              className={`flex flex-row px-4 py-2 rounded-lg border-2 bg-white focus-within:outline-none focus-within:ring-1 focus-within:ring-green  ${
                errors.password || registerError?.field === "password"
                  ? "border-red-500 focus-within:ring-red-500"
                  : "border-green"
              }`}
            >
              <input
                type={`${isPasswordVisible || "password"}`}
                className="outline-none flex flex-1"
                placeholder="Must be at least 8 characters"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <EyeButton
                isVisible={isPasswordVisible}
                setIsVisible={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </div>
            <p
              className={`text-red-500 text-sm ${errors.password || "hidden"}`}
            >
              {errors.password}
            </p>
          </div>

          <div className="confirm-container flex flex-col gap-1 text-lg">
            <Label className=" text-black text-lg">Confirm Password</Label>
            <div
              tabIndex={0}
              className={`flex flex-row px-4 py-2 rounded-lg border-2 bg-white focus-within:outline-none focus-within:ring-1 focus-within:ring-green  ${
                errors.confirmPassword || registerError?.field === "password"
                  ? "border-red-500 focus-within:ring-red-500"
                  : "border-green"
              }`}
            >
              <input
                type={`${isConfirmPasswordVisible || "password"}`}
                className="outline-none flex flex-1"
                placeholder="Re-enter your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <EyeButton
                isVisible={isConfirmPasswordVisible}
                setIsVisible={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              />
            </div>

            <p
              className={`text-red-500 text-sm ${errors.confirmPassword || "hidden"}`}
            >
              {errors.confirmPassword}
            </p>
          </div>

          <Button
            type="submit"
            className="Submit-button flex bg-green rounded-full min-w-full h-14 py-4 text-center items-center justify-center text-lg transition-all hover:bg-green_hover active:scale-[0.98] mt-6 text-white"
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center mb-8">
          Already Have an account?
          <Link to="/login">
            <span className="text-green px-2 cursor-pointer hover:underline-offset-4 hover:underline">
              Log in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
