import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";

interface FileUploadTabProps {
  value: FileList | null;
  onChange: (files: FileList) => void;
}

const FileUploadTab = ({ value, onChange }: FileUploadTabProps) => {
  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChange(event.target.files);
    }
  };

  return (
    <TabsContent value="files" className="w-full">
      {value &&
        [...value].map((file) => <Label key={file.name}>{file.name}</Label>)}
      <Input
        type="file"
        onChange={handleChangeFiles}
        className="self-center align-middle border-muted border-2 min-h-36 bg-slate-200"
      />
    </TabsContent>
  );
};

export default FileUploadTab;
