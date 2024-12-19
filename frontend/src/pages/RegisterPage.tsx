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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="main min-h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="main min-h-screen w-screen flex flex-col justify-center blur-sm items-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat" />
      <div className="bg-gray-300 fixed top-0 right-0 left-0 bottom-0 opacity-40" />
      <div className="min-h-screen w-screen flex flex-col fixed top-0 right-0 left-0 bottom-0 justify-center items-center bg-opacity-70 ">
        <Card className="flex items-center justify-center flex-col min-w-80 w-5/6 max-w-[450px] shadow-md dark:bg-dark-foreground">
          <CardHeader className="flex self-start px-9 ">
            <CardTitle className="text-3xl text-green">Register</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center w-full px-9">
            <form
              className=" flex flex-col gap-2 w-full"
              onSubmit={handleSubmit}
            >
              <div className="username-container flex flex-col gap-1 text-lg">
                <Label className="text-black text-base select-none dark:text-white">
                  Username
                </Label>
                <Input
                  className={`px-2.5 py-1.5 rounded-lg border bg-white dark:text-black focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all ${
                    errors.username || registerError?.field === "username"
                      ? "border-red-300 focus:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
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
                <Label className=" text-black text-base select-none dark:text-white">
                  Email
                </Label>
                <Input
                  className={`px-2.5 py-1.5 rounded-lg border bg-white dark:text-black focus:outline-none focus:ring-1 focus:ring-green focus:ring-offset-2 hover:outline-none hover:ring-green hover:ring-1 hover:ring-offset-2 transition-all  ${
                    errors.email || registerError?.field === "email"
                      ? "border-red-300 focus:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
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
                <Label className=" text-black text-base select-none dark:text-white">
                  Password
                </Label>
                <div
                  tabIndex={0}
                  className={`flex flex-row justify-center items-center pr-2 rounded-lg border bg-white dark:text-black focus-within:ring-offset-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all ${
                    errors.password || registerError?.field === "password"
                      ? "border-red-300 focus-within:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <Input
                    type={`${isPasswordVisible || "password"}`}
                    className="outline-none flex flex-1"
                    placeholder="Must be at least 8 characters"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <EyeButton
                    isVisible={isPasswordVisible}
                    setIsVisible={() =>
                      setIsPasswordVisible(!isPasswordVisible)
                    }
                  />
                </div>
                <p
                  className={`text-red-500 text-sm ${errors.password || "hidden"}`}
                >
                  {errors.password}
                </p>
              </div>

              <div className="confirm-container flex flex-col gap-1 text-lg">
                <Label className=" text-black text-base select-none dark:text-white">
                  Confirm Password
                </Label>
                <div
                  tabIndex={0}
                  className={`flex flex-row justify-center items-center rounded-lg border pr-2 focus-within:ring-offset-2 bg-white dark:text-black focus-within:outline-none focus-within:ring-1 focus-within:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all  ${
                    errors.confirmPassword ||
                    registerError?.field === "password"
                      ? "border-red-300 focus-within:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <Input
                    type={`${isConfirmPasswordVisible || "password"}`}
                    className="outline-none flex"
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
                className="Submit-button flex bg-green rounded-full min-w-full h-11 py-4 text-center items-center justify-center text-base transition-all hover:bg-green_hover active:scale-[0.98] mt-6 text-white"
              >
                {loading ? (
                  <Spinner size={12} color="#fff" animating={true} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-center text-base">
              Already have an account?
              <Link to="/login">
                <span className="text-green px-2 cursor-pointer hover:underline-offset-4 hover:underline text-base">
                  Log in
                </span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
