import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageEditor } from "@/components/ui/image-editor";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    console.log("File received in Index component:", file);
    setSelectedFile(file);
  };

  const handleReset = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 md:mb-4">
            Hat Photo Editor
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Upload your photo and add a stylish hat! Perfect for creating fun profile pictures and social media posts.
          </p>
        </div>

        {!selectedFile ? (
          <div className="max-w-lg md:max-w-2xl mx-auto px-4">
            <FileUpload 
              onFileSelect={handleFileSelect}
              className="h-48 md:h-64"
            />
          </div>
        ) : (
          <div className="w-full max-w-full md:max-w-6xl mx-auto px-2 md:px-4">
            <ImageEditor 
              imageFile={selectedFile}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
