import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CameraModalProps {
  isOpen: boolean; // Add isOpen prop to control visibility
  onClose: () => void; // Add onClose prop to handle modal close
  onCapture: (imageUrl: string) => void;
}

const CameraModal = ({ isOpen, onClose, onCapture }: CameraModalProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play(); // Ensure the video starts playing
      }
      
      toast({
        title: "Camera started",
        description: "Position your face in the frame",
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
    onClose(); // Close modal when camera stops
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/png");
        
        // Send image data to parent component
        onCapture(imageDataUrl);
        
        toast({
          title: "Picture captured",
          description: "Your facial recognition photo has been saved",
        });
        
        // Stop camera but keep modal open
        stopCamera();
      }
    }
  };

  React.useEffect(() => {
    if (isCameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play(); // Ensure the video starts playing
    }
  }, [isCameraActive, stream]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}> {/* Use isOpen prop */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Take Facial Recognition Photo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full overflow-hidden rounded-lg bg-muted">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-auto w-full"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-muted">
                <CameraOff className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          {/* Hidden canvas for capturing the image */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          
          <div className="flex w-full justify-center space-x-4">
            {isCameraActive ? (
              <Button onClick={capturePhoto} className="bg-festival-purple">
                <Camera className="mr-2 h-4 w-4" /> Capture Photo
              </Button>
            ) : (
              <Button onClick={startCamera} className="bg-festival-blue">
                <Camera className="mr-2 h-4 w-4" /> Start Camera
              </Button>
            )}
            <Button variant="outline" onClick={stopCamera}> {/* Call stopCamera */}
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraModal;
