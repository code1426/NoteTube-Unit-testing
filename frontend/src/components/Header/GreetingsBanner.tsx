import { useEffect, useState } from "react";

interface GreetingsBannerProps {
  isHomePage: boolean;
  username?: string;
}

const GreetingsBanner = ({ isHomePage, username }: GreetingsBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  return (
    <div
      id="main-container"
      className={`greetings-banner px-6 py-3 bg-green text-white rounded-lg shadow-lg 
      flex items-center justify-center text-lg font-bold
      ${isVisible ? "animate-slideIn" : "animate-slideOut"}
      `}
    >
      Welcome {username || "Guest"}!
    </div>
  );
};

export default GreetingsBanner;
