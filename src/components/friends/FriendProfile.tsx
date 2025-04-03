
import React from "react";
import { Friend } from "@/types/friend";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, X, MessageSquare, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FriendProfileProps {
  friend: Friend | null;
  onClose: () => void;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ friend, onClose }) => {
  if (!friend) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 pb-20 md:pb-4 bg-background/95 backdrop-blur-sm border-t shadow-lg animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-xl">Friend Profile</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={friend.image} alt={friend.name} />
          <AvatarFallback className="bg-festival-purple text-white">
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{friend.name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button className="flex items-center justify-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span>Message</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5" />
          <span>Location</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Currently at</h3>
          <p className="text-sm text-muted-foreground">Main Stage</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendProfile;
