import React from "react";
import VenueMarker from "./VenueMarker";
import UserLocationMarker from "./UserLocationMarker";
import FriendMarker from "./FriendMarker";
import { friends } from "@/data/friends";

interface StaticMapDisplayProps {
  onFriendSelect: (friend: Friend) => void;
  onVenueSelect: (venueId: string) => void;
}

const StaticMapDisplay: React.FC<StaticMapDisplayProps> = ({ onFriendSelect, onVenueSelect }) => {
  return (
    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Festival map GIF */}
        <img 
          src="/pics/kartta.gif" 
          alt="Festival Map" 
          className="w-full h-full object-cover"
        />

        {/* Map venue markers */}
        <VenueMarker 
          type="stage" 
          title="Main Stage" 
          position={{ top: "33%", left: "25%" }} 
          onClick={() => onVenueSelect("main-stage")}
        />
        <VenueMarker 
          type="dance" // Updated type to "dance" for multicolor
          title="Dance Arena" 
          position={{ top: "33%", left: "50%" }} 
          onClick={() => onVenueSelect("dance-arena")}
        />
        <VenueMarker 
          type="food" 
          title="Food Court" 
          position={{ top: "50%", left: "33%" }} 
          onClick={() => onVenueSelect("food-court")}
        />
        <VenueMarker 
          type="vip" 
          title="VIP Area" 
          position={{ top: "66%", left: "66%" }} 
          onClick={() => onVenueSelect("vip-area")}
        />
        <VenueMarker 
          type="facility" 
          title="Restrooms" 
          position={{ top: "50%", left: "66%" }} 
          onClick={() => onVenueSelect("restrooms")}
        />
        
        {/* Friend markers */}
        {friends.map(friend => (
          <FriendMarker 
            key={friend.id}
            name={friend.name}
            image={friend.image}
            position={friend.location || { top: "50%", left: "50%" }}
            onClick={() => onFriendSelect(friend)} // Pass friend to onFriendSelect
          />
        ))}
        
        {/* User location - static position */}
        <UserLocationMarker position={{ top: "60%", left: "50%" }} />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10"></div>
      </div>
    </div>
  );
};

export default StaticMapDisplay;