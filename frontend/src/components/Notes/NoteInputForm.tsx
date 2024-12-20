import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Upload } from "lucide-react";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

import TextAreaTab from "./TextAreaTab";
import FileUploadTab from "./FileUploadTab";

import { GenerateAIResponseProps } from "@/types/ai.types";
import { cn } from "@/lib/utils";
import { FileUploadSchema, TextInputSchema } from "@/utils/formSchemas";

interface NoteInputFormProps {
  onSubmit: (props: GenerateAIResponseProps) => Promise<void>;
  disabled: boolean;
}

const NoteInputForm = ({ onSubmit, disabled }: NoteInputFormProps) => {
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "files">("text");

  const textInputForm = useForm<z.infer<typeof TextInputSchema>>({
    resolver: zodResolver(TextInputSchema),
  });

  const fileUploadForm = useForm<z.infer<typeof FileUploadSchema>>({
    resolver: zodResolver(FileUploadSchema),
  });

  const switchTo = (tab: "text" | "files") => {
    if (tab === "text") {
      setSelectedFiles(null);
      fileUploadForm.reset();
    }
    if (tab === "files") {
      setText("");
      textInputForm.reset();
    }
    setActiveTab(tab);
  };

  const handleChangeText = (e: string) => {
    setText(e);
  };

  const handleUploadText = async () => {
    const trimmedText = text.trim();

    onSubmit({
      input: trimmedText,
    });
    setText("");
  };

  const handleChangeFiles = (files: FileList) => {
    if (files) {
      fileUploadForm.setValue("files", files, { shouldValidate: true });
      setSelectedFiles(files);
    }
  };

  const handleUploadFiles = async () => {
    try {
      if (!selectedFiles) {
        throw new Error("No files selected");
      }

      onSubmit({
        input: selectedFiles,
      });

      setSelectedFiles(null);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while uploading files",
      );
    }
  };

  return (
    <Card className="w-11/12 place-self-center pt-4 bg-white dark:bg-dark-foreground dark:border-dark-border">
      <CardContent>
        <Tabs defaultValue="text" className="flex flex-col gap-3">
          <TabsList className="w-1/2 flex">
            <TabsTrigger
              role="text-tab-btn"
              value="text"
              onClick={() => switchTo("text")}
              className=" m-0 rounded-tr-none hover:dark:bg-dark-background"
            >
              Text
            </TabsTrigger>
            <TabsTrigger
              role="file-tab-btn"
              value="files"
              onClick={() => switchTo("files")}
              className=" m-0 rounded-tl-none hover:dark:bg-dark-background"
            >
              Files
            </TabsTrigger>
          </TabsList>
          <TextAreaTab form={textInputForm} onChange={handleChangeText} />
          <FileUploadTab
            form={fileUploadForm}
            selectedFiles={selectedFiles}
            onChange={handleChangeFiles}
          />
        </Tabs>
      </CardContent>
      <CardFooter className={"md:justify-end"}>
        <Button
          disabled={disabled}
          className={cn(
            "bg-green hover:bg-green_hover text-base",
            "w-full md:min-w-72 md:w-auto",
          )}
          onClick={() => {
            if (activeTab === "text") {
              textInputForm.handleSubmit(handleUploadText)();
            }
            if (activeTab === "files") {
              fileUploadForm.handleSubmit(handleUploadFiles)();
            }
          }}
        >
          <Upload />
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteInputForm;
