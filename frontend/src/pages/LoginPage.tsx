import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

import { LoginData } from "../types/user.types";
import useAuth from "../hooks/auth/useAuth";

import EyeButton from "@/components/EyeButton";

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="main min-h-screen w-screen flex flex-col justify-center blur-sm items-center bg-cover bg-center bg-[url('/src/assets/images/paper-texture-bg.jpg')] bg-repeat" />
      <div className="bg-gray-300 fixed top-0 right-0 left-0 bottom-0 opacity-40" />
      <div className="min-h-screen w-screen flex flex-col fixed top-0 right-0 left-0 bottom-0 justify-center items-center bg-opacity-70 ">
        <Card className="flex items-center justify-center flex-col min-w-80 w-5/6 max-w-[450px] shadow-md dark:bg-dark-foreground">
          <CardHeader className="flex self-start px-9">
            <CardTitle className="text-3xl text-green">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center w-full px-9">
            <form
              className=" flex flex-col gap-2 w-full"
              onSubmit={handleSubmit}
            >
              <div className="username-container flex flex-col gap-1 text-lg">
                <Label className="text-black text-base select-none dark:text-white">
                  Username or Email
                </Label>
                <Input
                  className={`px-2.5 py-1.5 rounded-lg border bg-white dark:text-black focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all ${
                    errors.usernameEmail || loginError?.field === "both"
                      ? "border-red-300 focus:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="Enter your username or email"
                  name="usernameEmail"
                  value={formData.usernameEmail}
                  onChange={handleChange}
                />
                {errors.usernameEmail && (
                  <p className="text-red-500 text-sm">{errors.usernameEmail}</p>
                )}
              </div>

              <div className="password-container flex flex-col gap-1 text-lg">
                <Label className=" text-black text-base select-none dark:text-white">
                  Password
                </Label>
                <div
                  tabIndex={0}
                  className={`flex flex-row justify-center items-center pr-2 rounded-lg border bg-white dark:text-black focus-within:ring-offset-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all ${
                    errors.password || loginError?.field === "both"
                      ? "border-red-300 focus-within:ring-red-500 hover:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <Input
                    type={`${isPasswordVisible || "password"}`}
                    className="outline-none flex flex-1"
                    placeholder="Enter your password"
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

              <Button
                type="submit"
                className="Submit-button flex bg-green rounded-full min-w-full h-11 py-4 text-center items-center justify-center text-base transition-all hover:bg-green_hover active:scale-[0.98] mt-6 text-white"
              >
                {loading ? (
                  <Spinner size={12} color="#fff" animating={true} />
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-center text-base">
              Not yet registered?
              <Link to="/register">
                <span className="text-green px-2 cursor-pointer hover:underline-offset-4 hover:underline text-base">
                  Sign Up
                </span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
