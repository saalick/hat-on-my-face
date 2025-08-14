import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
}

export const FileUpload = ({ onFileSelect, accept = "image/*", className }: FileUploadProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      className={cn(
        "relative border-2 border-dashed border-muted-foreground/25 rounded-lg",
        "transition-all duration-300 hover:border-primary/50 hover:bg-gradient-glass",
        "group cursor-pointer",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-glow transition-transform duration-300 group-hover:scale-110">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-muted-foreground text-sm">
          Drag and drop an image here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          Supports JPG, PNG, and WEBP formats
        </p>
      </div>
    </div>
  );
};