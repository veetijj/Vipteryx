import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, CreditCard, Camera } from "lucide-react";
import CameraModal from "@/components/CameraModal";

const PersonalInformation = () => {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // Store captured image
  const userName = "Festival Goer"; // Replace with actual user name
  const paymentMethodConnected = false; // Replace with actual connection status

  const handleCapture = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setIsCameraModalOpen(false); // Close modal after capturing photo
  };

  const handleCancel = () => {
    setIsCameraModalOpen(false); // Close modal when cancel is pressed
  };

  return (
    <div className="pb-20 px-4">
      <h1 className="text-2xl font-bold my-6">Personal Information</h1>
      
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4 border-2 border-festival-purple">
          <AvatarImage src={profileImage || ""} />
          <AvatarFallback className="bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{userName}</h2>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setIsCameraModalOpen(true)} // Open modal on button click
        >
          <Camera className="mr-2 h-4 w-4" /> Update Photo
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
            <CreditCard className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Payment Method</h3>
            <p className="text-sm text-muted-foreground">
              Link your payment method for seamless transactions.
            </p>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-festival-purple text-white"
          >
            {paymentMethodConnected ? "Disconnect" : "Connect"}
          </Button>
        </CardContent>
      </Card>

      <CameraModal
        isOpen={isCameraModalOpen} // Control modal visibility
        onClose={handleCancel} // Close modal on cancel
        onCapture={handleCapture} // Handle photo capture
      />
    </div>
  );
};

export default PersonalInformation;
