import { useEffect } from "react";
import toast from "react-hot-toast";

interface GreetingsBannerProps {
  isHomePage: boolean;
  username?: string;
}

const GreetingsBanner = ({ isHomePage, username }: GreetingsBannerProps) => {
  useEffect(() => {
    const hasShownBanner = localStorage.getItem("hasShownBanner");

    if (isHomePage && !hasShownBanner) {
      localStorage.setItem("hasShownBanner", "true");

      toast.success(`Welcome ${username || "Guest"}!`, {
        duration: 3000,
        position: "top-right",
        style: {
          borderWidth: 2,
          borderColor: "#03C04A",
          background: "white",
          color: "#03C04A",
          fontSize: "1rem",
          fontWeight: "bold",
          animation: "slideIn 0.5s ease-out, fadeOut 0.5s ease-in 3.5s",
          marginRight: "1.5rem",
        },
      });
    }
  }, [isHomePage, username]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default GreetingsBanner;
