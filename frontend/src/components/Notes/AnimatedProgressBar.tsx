import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const AnimatedProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <Progress value={progress} />;
};

export default AnimatedProgressBar;
