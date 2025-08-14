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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Hat Photo Editor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your photo and add a stylish hat! Perfect for creating fun profile pictures and social media posts.
          </p>
        </div>

        {!selectedFile ? (
          <div className="max-w-2xl mx-auto">
            <FileUpload 
              onFileSelect={handleFileSelect}
              className="h-64"
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
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
