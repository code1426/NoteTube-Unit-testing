import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";

interface NoteContentProps {
  content: string;
}

const NoteContent: React.FC<NoteContentProps> = ({ content }) => {
  return (
    <Card className="dark:bg-dark-foreground dark:border-dark-border bg-white">
      <CardContent className="prose max-w-full p-6">
        <Label className="text-2xl text-green-700 dark:text-green font-bold">
          Summary
        </Label>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
};

export default NoteContent;
