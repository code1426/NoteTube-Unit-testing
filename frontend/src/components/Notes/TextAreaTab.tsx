import { TabsContent } from "../ui/tabs";
import { Toaster } from "../ui/toaster";
import { AutosizeTextarea } from "../ui/autosize-textarea";

interface TextAreaTabProps {
  value: string;
  onChange: (value: string) => void;
}

const TextAreaTab = ({ value, onChange }: TextAreaTabProps) => {
  return (
    <TabsContent value="text" className="w-full space-y-6">
      <Toaster />
      <AutosizeTextarea
        value={value}
        placeholder="Write your notes here..."
        minHeight={100}
        maxHeight={400}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </TabsContent>
  );
};
export default TextAreaTab;
