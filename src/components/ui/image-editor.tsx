import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, util } from "fabric";
import { Button } from "./button";
import { Slider } from "./slider";
import { RotateCcw, Download, Trash2, Move, RotateCw } from "lucide-react";
import { toast } from "sonner";
import hatImage from "@/assets/hatt.png";

interface ImageEditorProps {
  imageFile: File;
  onReset: () => void;
}

export const ImageEditor = ({ imageFile, onReset }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [hatObject, setHatObject] = useState<FabricImage | null>(null);
  const [hatSize, setHatSize] = useState(100);
  const [hatRotation, setHatRotation] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Make canvas responsive
    const isMobile = window.innerWidth < 768;
    const canvasWidth = isMobile ? Math.min(window.innerWidth - 32, 400) : 800;
    const canvasHeight = isMobile ? Math.min(window.innerHeight * 0.5, 300) : 600;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    // Load user image
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      util.loadImage(imgUrl).then((img) => {
        const fabricImg = new FabricImage(img, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });

        // Scale image to fit canvas
        const scale = Math.min(
          canvas.width! / fabricImg.width!,
          canvas.height! / fabricImg.height!
        );
        fabricImg.scale(scale);
        
        canvas.add(fabricImg);
        canvas.centerObject(fabricImg);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(imageFile);

    return () => {
      canvas.dispose();
    };
  }, [imageFile]);

  const addHat = () => {
    if (!fabricCanvas || hatObject) return;

    util.loadImage(hatImage).then((img) => {
      const hat = new FabricImage(img, {
        left: fabricCanvas.width! / 2,
        top: fabricCanvas.height! / 3,
        originX: "center",
        originY: "center",
        scaleX: 0.3,
        scaleY: 0.3,
      });

      fabricCanvas.add(hat);
      setHatObject(hat);
      fabricCanvas.setActiveObject(hat);
      fabricCanvas.renderAll();
      toast.success("Hat added! Drag to position it perfectly.");
    });
  };

  const removeHat = () => {
    if (!fabricCanvas || !hatObject) return;
    fabricCanvas.remove(hatObject);
    setHatObject(null);
    setHatSize(100);
    setHatRotation(0);
    fabricCanvas.renderAll();
    toast.success("Hat removed!");
  };

  const updateHatSize = (size: number[]) => {
    if (!hatObject) return;
    const scale = size[0] / 100;
    hatObject.set({ scaleX: scale * 0.3, scaleY: scale * 0.3 });
    fabricCanvas?.renderAll();
    setHatSize(size[0]);
  };

  const updateHatRotation = (rotation: number[]) => {
    if (!hatObject) return;
    hatObject.set({ angle: rotation[0] });
    fabricCanvas?.renderAll();
    setHatRotation(rotation[0]);
  };

  const downloadImage = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.download = "photo-with-hatt.png";
    link.href = dataURL;
    link.click();
    
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={addHat} disabled={!!hatObject} variant="default" size="sm" className="flex-1 sm:flex-initial">
            Add Hat
          </Button>
          <Button onClick={removeHat} disabled={!hatObject} variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Remove Hat</span>
            <span className="sm:hidden">Remove</span>
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={downloadImage} variant="default" size="sm" className="flex-1 sm:flex-initial">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={onReset} variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <RotateCcw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">New Photo</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      {hatObject && (
        <div className="bg-card rounded-lg p-4 space-y-4 shadow-soft">
          <h3 className="font-semibold flex items-center gap-2">
            <Move className="w-4 h-4" />
            Hat Controls
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Size: {hatSize}%
              </label>
              <Slider
                value={[hatSize]}
                onValueChange={updateHatSize}
                min={20}
                max={200}
                step={5}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rotation: {hatRotation}°
              </label>
              <Slider
                value={[hatRotation]}
                onValueChange={updateHatRotation}
                min={-180}
                max={180}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg shadow-large overflow-hidden">
        <canvas ref={canvasRef} className="w-full max-w-full border" style={{ height: 'auto' }} />
      </div>
    </div>
  );
};
