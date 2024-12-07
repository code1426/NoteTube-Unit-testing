import { useState, useRef } from "react";
import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiTrash,
  PiUpload,
} from "react-icons/pi";
import toast from "react-hot-toast";

import { GenerateAIResponseProps } from "../../types/ai.types";

interface NoteInputFieldProps {
  onSubmit: (props: GenerateAIResponseProps) => void;
}

const NoteInputField = ({ onSubmit }: NoteInputFieldProps) => {
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files : null;
    if (files) {
      if (files.length > 4) {
        toast.error("Please upload up to 4 files at a time.");
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
          toast.error(
            `${file.name} has an unsupported file type. Please upload a PDF, JPEG, JPG, PNG, or text file.`,
          );
          return;
        }
        if (file.size > 10 * 1024 ** 2) {
          toast.error(
            `${file.name} exceeds 10MB. Please upload a smaller file.`,
          );
          return;
        }
      });

      setSelectedFiles(files);
      setText("");
    }
  };

  const handleUploadText = () => {
    const trimmedText = text.trim();
    if (trimmedText.length < 50) {
      toast.error("Please enter at least 50 characters before uploading.");
      return;
    }
    onSubmit({
      input: trimmedText,
      outputOption: "summary",
    });
    setText("");
  };

  const handleUploadFile = async () => {
    try {
      if (!selectedFiles) {
        throw new Error("Please select files to upload.");
      }

      onSubmit({
        input: selectedFiles,
        outputOption: "summary",
      });

      setSelectedFiles(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleUploadNote = () => {
    if (!text && !selectedFiles) {
      toast.error("Please enter some text or upload a file.");
      return;
    }

    if (selectedFiles) {
      handleUploadFile();
    } else {
      handleUploadText();
    }
  };

  const clearField = () => {
    setText("");
    setSelectedFiles(null);
  };

  const createBulletedList = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const beforeText = text.slice(0, selectionStart);
      const selectedText = text.slice(selectionStart, selectionEnd);
      const afterText = text.slice(selectionEnd);

      const formattedText = selectedText
        .split("\n")
        .map((line) => {
          const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
          return cleanedLine ? `• ${cleanedLine}` : "";
        })
        .join("\n");

      setText(beforeText + formattedText + afterText);
    }
  };

  const createNumberedList = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const beforeText = text.slice(0, selectionStart);
      const selectedText = text.slice(selectionStart, selectionEnd);
      const afterText = text.slice(selectionEnd);

      const formattedText = selectedText
        .split("\n")
        .map((line, index) => {
          const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
          return cleanedLine ? `${index + 1}. ${cleanedLine}` : "";
        })
        .join("\n");

      setText(beforeText + formattedText + afterText);
    }
  };

  return (
    <div className="textInputSection w-[87%]  self-center select-none pb-8">
      <div
        className="rounded-lg border-4 border-green flex flex-col 
      shadow-xl shadow-gray-400"
      >
        {" "}
        {!selectedFiles ? (
          <textarea
            ref={textareaRef}
            className="textBox h-80 p-3 rounded border-2 outline-green_dark border-green text-black justify-left text-responsive font-primaryRegular overflow-y-scroll resize-none scrollbar-custom"
            placeholder="Input text here"
            value={text}
            disabled={!!selectedFiles}
            onChange={handleChangeText}
          />
        ) : (
          <div className="flex justify-center items-center h-80">
            {[...selectedFiles].map((file, index) => (
              <p key={index} className="text-black text-lg">
                {file.name} - {file.size / 1000} KB
              </p>
            ))}
          </div>
        )}
        <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
          <div className="flex gap-2">
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createBulletedList}
              disabled={selectedFiles !== null}
            >
              <PiListBold size={40} />
            </button>
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createNumberedList}
              disabled={selectedFiles !== null}
            >
              <PiListNumbersBold size={40} />
            </button>
          </div>
          <button
            className="p-2 text-black hover:bg-gray-200 rounded"
            onClick={clearField}
          >
            <PiTrash size={40} />
          </button>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center gap-4">
        <label className="shadow-md shadow-gray-400 px-6 py-3 flex items-center bg-green hover:bg-green_hover text-white rounded-lg text-responsive font-secondaryRegular cursor-pointer transition-all active:bg-green_hover">
          <PiPaperclip size={30} />
          <span className="ml-2">Attach Files</span>
          <input
            type="file"
            className="hidden"
            onChange={handleChangeFiles}
            accept=".pdf,.txt,.jpeg,.png,.jpg"
            multiple
            max={4}
          />
        </label>
        <button
          className="shadow-md shadow-gray-400 px-6 py-3 flex gap-2 border-2 border-green hover:bg-gray-200 text-black rounded-lg text-responsive font-secondaryRegular transition-all active:bg-gray-200"
          onClick={handleUploadNote}
        >
          <PiUpload size={30} />
          Upload
        </button>
      </div>
    </div>
  );
};

export default NoteInputField;
