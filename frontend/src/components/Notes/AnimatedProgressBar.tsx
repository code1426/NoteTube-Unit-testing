import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimatedProgressBarProps {
  title: string;
  className?: string;
}

const AnimatedProgressBar = ({
  title,
  className,
}: AnimatedProgressBarProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <Progress value={progress} />
    </div>
  );
};

export default AnimatedProgressBar;
