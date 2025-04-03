
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { Friend } from "@/types/friend";

interface FriendCardProps {
  friend: Friend;
  onClick: (friend: Friend) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onClick }) => {
  return (
    <Card 
      className="flex items-center p-3 cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onClick(friend)}
    >
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src={friend.image} />
        <AvatarFallback className="bg-festival-purple text-white">
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium">{friend.name}</h3>
      </div>
    </Card>
  );
};

export default FriendCard;
