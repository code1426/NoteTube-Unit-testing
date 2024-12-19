import { useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "@/context/Contexts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("ThemeToggle mounted, current theme:", theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Switching to ${newTheme} mode`);
    setTheme(newTheme);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleTheme}
            className={`
              w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out
              ${theme === "dark" ? "bg-dark-foreground" : "bg-gray-200"}
            `}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <div
              className={`
                w-5 h-5 rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center
                ${theme === "dark" ? "translate-x-7 bg-white" : "translate-x-0 bg-white"}
              `}
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-500" />
              )}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
