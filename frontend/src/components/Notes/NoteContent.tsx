import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";

interface NoteContentProps {
  content: string;
}

const NoteContent: React.FC<NoteContentProps> = ({ content }) => {
  return (
    <Card>
      <CardContent className="prose dark:prose-invert max-w-6xl p-6">
        <Label className="text-2xl text-green-700 font-bold">Summary</Label>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
};

export default NoteContent;
