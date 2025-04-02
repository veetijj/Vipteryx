
import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera as LucideCamera, CameraOff, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import * as ExpoCamera from "expo-camera";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageUrl: string) => void;
}

const CameraModal = ({ isOpen, onClose, onCapture }: CameraModalProps) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<any>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      
      if (status === 'granted') {
        setIsCameraActive(true);
        toast({
          title: "Camera started",
          description: "Position your face in the frame",
        });
      } else {
        toast({
          title: "Camera error",
          description: "Could not access your camera. Please check permissions.",
          variant: "destructive",
        });
      }
    } else {
      // Web fallback
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setHasCameraPermission(true);
        setIsCameraActive(true);
        toast({
          title: "Camera started",
          description: "Position your face in the frame",
        });
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          title: "Camera error",
          description: "Could not access your camera. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const capturePhoto = async () => {
    if (cameraRef.current && Platform.OS !== 'web') {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // Convert to base64 data URL format for consistency with web version
        const imageDataUrl = `data:image/jpeg;base64,${photo.base64}`;
        
        // Send image data to parent component
        onCapture(imageDataUrl);
        
        toast({
          title: "Picture captured",
          description: "Your facial recognition photo has been saved",
        });
        
        // Close modal and stop camera
        handleClose();
      } catch (error) {
        console.error("Error capturing photo:", error);
        toast({
          title: "Error",
          description: "Failed to capture photo",
          variant: "destructive",
        });
      }
    } else if (Platform.OS === 'web') {
      // Web fallback using canvas
      const video = document.querySelector('video');
      const canvas = document.createElement('canvas');
      
      if (video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL("image/png");
          onCapture(imageDataUrl);
          
          toast({
            title: "Picture captured",
            description: "Your facial recognition photo has been saved",
          });
          
          handleClose();
        }
      }
    }
  };

  // Start camera when modal opens
  useEffect(() => {
    if (isOpen) {
      requestCameraPermission();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const renderCamera = () => {
    if (Platform.OS === 'web') {
      if (isCameraActive) {
        return (
          <video
            autoPlay
            playsInline
            muted
            className="h-auto w-full"
          />
        );
      }
      return (
        <div className="flex h-64 w-full items-center justify-center bg-muted">
          <CameraOff className="h-12 w-12 text-muted-foreground" />
        </div>
      );
    }

    // Native platforms (iOS/Android)
    if (isCameraActive && hasCameraPermission) {
      return (
        <View style={{ height: 300 }}>
          <ExpoCamera.Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            type={ExpoCamera.CameraType.front}
          />
        </View>
      );
    }
    
    return (
      <View style={{ height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
        <CameraOff size={48} color="#666" />
      </View>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Take Facial Recognition Photo</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full overflow-hidden rounded-lg bg-muted">
            {renderCamera()}
          </div>
          
          <div className="flex w-full justify-center space-x-4">
            {isCameraActive ? (
              <Button onClick={capturePhoto} className="bg-festival-purple">
                <LucideCamera className="mr-2 h-4 w-4" /> Capture Photo
              </Button>
            ) : (
              <Button onClick={requestCameraPermission} className="bg-festival-blue">
                <LucideCamera className="mr-2 h-4 w-4" /> Start Camera
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraModal;
