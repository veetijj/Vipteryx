
import React from "react";
import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface FriendMarkerProps {
  name: string;
  image: string;
  position: {
    top: string;
    left: string;
  };
}

const FriendMarker: React.FC<FriendMarkerProps> = ({ name, image, position }) => {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ top: position.top, left: position.left }}
      title={name}
    >
      <div className="relative">
        <Avatar className="h-8 w-8 border-2 border-white shadow-lg">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-festival-purple text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-white"></div>
      </div>
    </div>
  );
};

export default FriendMarker;
