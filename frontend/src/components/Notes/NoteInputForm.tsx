import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import TextAreaTab from "./TextAreaTab";
import FileUploadTab from "./FileUploadTab";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useState } from "react";
import { GenerateAIResponseProps } from "@/types/ai.types";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { PiUpload } from "react-icons/pi";

interface NoteInputFormProps {
  onSubmit: (props: GenerateAIResponseProps) => void;
}

const NoteInputForm = ({ onSubmit }: NoteInputFormProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const clearText = () => {
    setText("");
  };

  const handleChangeText = (e: string) => {
    setText(e);
  };

  const handleUploadText = () => {
    const trimmedText = text.trim();

    if (trimmedText.length < 50) {
      toast({
        variant: "destructive",
        title: "Please enter at least 50 characters before uploading.",
      });
      return;
    }

    if (trimmedText.length > 4000) {
      toast({
        variant: "destructive",
        title: "Please enter less than 4000 characters.",
      });
      return;
    }

    {
      toast({
        title: "You submitted this note:",
        description: trimmedText,
      });
    }

    onSubmit({
      input: trimmedText,
    });
    clearText();
  };

  const handleChangeFiles = (files: FileList) => {
    if (files) {
      if (files.length > 4) {
        toast({
          variant: "destructive",
          title: "Please upload up to 4 files at a time.",
        });
        return;
      }

      const supportedFileTypes = [
        "application/pdf",
        "text/plain",
        "image/jpeg",
        "image/png",
      ];

      [...files].map((file) => {
        if (!supportedFileTypes.includes(file.type)) {
          toast({
            variant: "destructive",
            title: `${file.name} has an unsupported file type. Please upload a PDF, JPEG, JPG, PNG, or text file.`,
          });
          return;
        }
        if (file.size > 10 * 1024 ** 2) {
          toast({
            variant: "destructive",
            title: `${file.name} exceeds 10MB. Please upload a smaller file.`,
          });
          return;
        }
      });

      setSelectedFiles(files);
      setText("");
    }
  };

  const handleUploadFiles = async () => {
    try {
      if (!selectedFiles) {
        throw new Error("Please select files to upload.");
      }

      onSubmit({
        input: selectedFiles,
      });

      setSelectedFiles(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Card className="w-11/12 place-self-center">
      <CardHeader></CardHeader>
      <CardContent>
        <Tabs defaultValue="text" className="flex flex-col gap-3">
          <TabsList className="w-1/2 flex">
            <TabsTrigger value="text" onClick={clearText}>
              Text
            </TabsTrigger>
            <TabsTrigger value="files" onClick={clearText}>
              Files
            </TabsTrigger>
          </TabsList>
          <TextAreaTab value={text} onChange={handleChangeText} />
          <FileUploadTab value={selectedFiles!} onChange={handleChangeFiles} />
        </Tabs>
      </CardContent>
      <CardFooter className={isMobile ? "" : "justify-end"}>
        <Button
          className={
            isMobile
              ? "w-full bg-green text-base hover:bg-green_hover"
              : "min-w-72 bg-green text-base hover:bg-green_hover"
          }
          onClick={() => {
            if (text) {
              handleUploadText();
            } else {
              handleUploadFiles();
            }
          }}
        >
          Upload
          <PiUpload />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteInputForm;
