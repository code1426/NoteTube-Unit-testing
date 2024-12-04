import { useState, useRef } from "react";
import {
  PiListBold,
  PiListNumbersBold,
  PiPaperclip,
  PiTrash,
  PiUpload,
} from "react-icons/pi";
import toast from "react-hot-toast";

import { AIOutputOptions, GenerateAIResponseProps } from "../../types/ai.types";

interface NoteInputFieldProps {
  onSubmit: (props: GenerateAIResponseProps) => void;
}

const NoteInputField = ({ onSubmit }: NoteInputFieldProps) => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const allowedTypes = ["application/pdf", "text/plain"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Unsupported file type. Please upload a PDF or text file.");
        return;
      }
      if (file.size > 5 * 1024 ** 2) {
        toast.error("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }
      setSelectedFile(file);
      setText("");
    }
  };

  const handleUploadText = () => {
    const trimmedText = text.trim();
    if (trimmedText.length < 50) {
      toast.error("Please enter at least 50 characters before uploading.");
      return;
    }
    onSubmit({ input: trimmedText, outputOption: AIOutputOptions.SUMMARY });
    setText("");
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    console.log(selectedFile);
    onSubmit({
      input: selectedFile,
      outputOption: AIOutputOptions.SUMMARY,
    });
    setSelectedFile(null);
  };

  const handleUploadNote = () => {
    if (!text && !selectedFile) {
      toast.error("Please enter some text or upload a file.");
      return;
    }

    if (selectedFile) {
      handleUploadFile();
    } else {
      handleUploadText();
    }
  };

  const clearField = () => {
    setText("");
    setSelectedFile(null);
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
        {!selectedFile ? (
          <textarea
            ref={textareaRef}
            className="textBox h-80 p-3 rounded border-2 outline-green_dark border-green text-black justify-left text-responsive font-primaryRegular overflow-y-scroll resize-none scrollbar-custom"
            placeholder="Input text here"
            value={text}
            disabled={!!selectedFile}
            onChange={handleChangeText}
          />
        ) : (
          <div className="flex justify-center items-center h-80">
            <p className="text-black text-lg">
              {selectedFile.name} - {selectedFile.size / 1000} KB
            </p>
          </div>
        )}
        <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
          <div className="flex gap-2">
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createBulletedList}
              disabled={selectedFile !== null}
            >
              <PiListBold size={40} />
            </button>
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createNumberedList}
              disabled={selectedFile !== null}
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
            onChange={handleChangeFile}
            accept=".pdf,.txt"
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
