import { Upload, X } from "lucide-react";

import formatBytes from "@/utils/formatBytes";

interface FIleCardProps {
  file: File;
  onDelete: () => void;
}

const FileCard = ({ file, onDelete }: FIleCardProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-muted-foreground/20 last:border-b-0">
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={onDelete}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <X size={20} />
        </button>
        <div className="flex items-center justify-center w-8 h-8 bg-muted-foreground/10 rounded-lg">
          <Upload size={20} className="text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground/70">{file.name}</p>
      </div>
      <p className="text-sm text-muted-foreground/70">
        {formatBytes(file.size)}
      </p>
    </div>
  );
};

export default FileCard;
