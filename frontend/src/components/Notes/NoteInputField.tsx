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
  const [noteText, setNoteText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    console.log(selectedFile);
    if (file) {
      console.log(file.name);
      onSubmit({ input: file, outputOption: AIOutputOptions.SUMMARY });
      setSelectedFile(null);
    }
  };

  const handleNoteUpload = () => {
    if (!noteText.trim()) {
      toast.error("Please enter some text before uploading.");
      return;
    }
    console.log(noteText);
    onSubmit({ input: noteText, outputOption: AIOutputOptions.SUMMARY });
    setNoteText("");
  };

  const clearText = () => {
    setNoteText("");
  };

  const createBulletedList = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const beforeText = noteText.slice(0, selectionStart);
      const selectedText = noteText.slice(selectionStart, selectionEnd);
      const afterText = noteText.slice(selectionEnd);

      const formattedText = selectedText
        .split("\n")
        .map((line) => {
          const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
          return cleanedLine ? `• ${cleanedLine}` : "";
        })
        .join("\n");

      setNoteText(beforeText + formattedText + afterText);
    }
  };

  const createNumberedList = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const beforeText = noteText.slice(0, selectionStart);
      const selectedText = noteText.slice(selectionStart, selectionEnd);
      const afterText = noteText.slice(selectionEnd);

      const formattedText = selectedText
        .split("\n")
        .map((line, index) => {
          const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
          return cleanedLine ? `${index + 1}. ${cleanedLine}` : "";
        })
        .join("\n");

      setNoteText(beforeText + formattedText + afterText);
    }
  };

  return (
    <div className="textInputSection w-[87%]  self-center select-none pb-8">
      <div
        className="rounded-lg border-4 border-green flex flex-col 
      shadow-xl shadow-gray-400"
      >
        <textarea
          ref={textareaRef}
          className="textBox h-80 p-3 rounded border-2 outline-green_dark border-green text-black justify-left text-responsive font-primaryRegular overflow-y-scroll resize-none scrollbar-custom"
          placeholder="Input text here"
          value={noteText}
          onChange={handleTextChange}
        />
        <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
          <div className="flex gap-2">
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createBulletedList}
            >
              <PiListBold size={40} />
            </button>
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={createNumberedList}
            >
              <PiListNumbersBold size={40} />
            </button>
          </div>
          <button
            className="p-2 text-black hover:bg-gray-200 rounded"
            onClick={clearText}
          >
            <PiTrash size={40} />
          </button>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center gap-4">
        <label className="shadow-md shadow-gray-400 px-6 py-3 flex items-center bg-green hover:bg-green_hover text-white rounded-lg text-responsive font-secondaryRegular cursor-pointer transition-all active:bg-green_hover">
          <PiPaperclip size={30} />
          <span className="ml-2">Attach Files</span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        <button
          className="shadow-md shadow-gray-400 px-6 py-3 flex gap-2 border-2 border-green hover:bg-gray-200 text-black rounded-lg text-responsive font-secondaryRegular transition-all active:bg-gray-200"
          onClick={handleNoteUpload}
        >
          <PiUpload size={30} />
          Upload
        </button>
      </div>
    </div>
  );
};

export default NoteInputField;
