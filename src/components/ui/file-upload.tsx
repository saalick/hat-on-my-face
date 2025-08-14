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
      console.log("Drop event triggered", e.dataTransfer.files);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        console.log("File selected via drop:", files[0]);
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
      console.log("File input change triggered", e.target.files);
      const files = e.target.files;
      if (files && files.length > 0) {
        console.log("File selected via input:", files[0]);
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
      <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-3 md:mb-4 shadow-glow transition-transform duration-300 group-hover:scale-110">
          <Upload className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
        </div>
        <h3 className="text-base md:text-lg font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-muted-foreground text-xs md:text-sm px-2">
          Drag and drop an image here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2 hidden md:block">
          Supports JPG, PNG, and WEBP formats
        </p>
      </div>
    </div>
  );
};
