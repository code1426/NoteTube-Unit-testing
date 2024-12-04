import { useEffect, useState } from "react";

interface GreetingsBannerProps {
  isHomePage: boolean;
  username?: string;
}

const GreetingsBanner = ({ isHomePage, username }: GreetingsBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasShownBanner = localStorage.getItem("hasShownBanner");

    if (isHomePage && !hasShownBanner) {
      setIsVisible(true);
      localStorage.setItem("hasShownBanner", "true");
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  return isVisible ? (
    <div
      id="main-container"
      className={`greetings-banner px-6 py-3 bg-green text-white rounded-lg shadow-lg 
        flex items-center justify-center text-lg font-bold
        animate-slideIn`}
    >
      Welcome {username || "Guest"}!
    </div>
  ) : null;
};

export default GreetingsBanner;
