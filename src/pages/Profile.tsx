
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings, Bookmark, Link2, Ticket, ChevronRight, Camera } from "lucide-react";
import CameraModal from "@/components/CameraModal";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setShowCamera(false);
    toast({
      title: "Profile updated",
      description: "Your facial recognition photo has been set as your profile picture",
    });
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-20 px-4">
      {/* Profile Header */}
      <div className="w-full flex flex-col items-center mb-8">
        <div className="relative">
          <Avatar className="h-24 w-24 mb-4 border-2 border-festival-purple">
            <AvatarImage src={profileImage || ""} />
            <AvatarFallback className="bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <Button 
            onClick={() => setShowCamera(true)}
            size="icon"
            variant="outline"
            className="absolute bottom-3 right-0 rounded-full bg-white dark:bg-gray-800 border border-festival-purple hover:bg-festival-purple hover:text-white"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="text-xl font-bold">Festival Goer</h1>
        {profileImage && (
          <p className="text-xl text-festival-purple mt-1">Facial recognition enabled</p>
        )}
      </div>

      {/* Camera Modal */}
      <CameraModal 
        isOpen={showCamera} 
        onClose={() => setShowCamera(false)}
        onCapture={handleCapture}
      />

      {/* Profile Menu */}
      <div className="w-full space-y-3">
        <ProfileMenuItem 
          icon={<User className="h-5 w-5" />}
          label="Personal Information"
          to="#"
        />
        
        <ProfileMenuItem 
          icon={<Settings className="h-5 w-5" />}
          label="Preferences"
          to="#"
        />
        
        <ProfileMenuItem 
          icon={<Bookmark className="h-5 w-5" />}
          label="Saved events"
          to="#"
        />
        
        <ProfileMenuItem 
          icon={<Link2 className="h-5 w-5" />}
          label="Connected apps"
          to="/connected-apps"
        />
        
        <ProfileMenuItem 
          icon={<Ticket className="h-5 w-5" />}
          label="My tickets"
          to="/tickets"
        />
        
        <ProfileMenuItem 
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          to="#"
        />
      </div>

      {/* App Info Card */}
      <Card className="w-full mt-8 overflow-hidden">
        <div className="h-3 festival-gradient w-full"></div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-2">About Festival Companion</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Your personalized guide to events. Connect apps and get tailored recommendations.
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Learn more
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileMenuItem = ({ 
  icon, 
  label, 
  to 
}: { 
  icon: React.ReactNode; 
  label: string; 
  to: string;
}) => {
  return (
    <a 
      href={to}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border"
    >
      <div className="flex items-center">
        <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </a>
  );
};

export default Profile;
