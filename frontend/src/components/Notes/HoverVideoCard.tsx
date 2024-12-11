import { HoverCardContent } from "@/components/ui/hover-card";
import React from "react";

interface HoverVideoCardProps {
  title: string;
}

const HoverVideoCard: React.FC<HoverVideoCardProps> = ({ title }) => {
  return (
    <HoverCardContent className="bg-slate-100 w-60">
      <div className="space-y-2">
        <label className="text-sm font-semibold">{title}</label>
      </div>
    </HoverCardContent>
  );
};

export default HoverVideoCard;
