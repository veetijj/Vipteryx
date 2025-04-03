
import React from "react";
import VenueMarker from "./VenueMarker";
import UserLocationMarker from "./UserLocationMarker";

const StaticMapDisplay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Static festival map image */}
        <img 
          src="https://i.imgur.com/xG6vYGH.jpg" 
          alt="Festival Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Map venue markers - static positions */}
        <VenueMarker 
          type="stage" 
          title="Main Stage" 
          position={{ top: "33%", left: "25%" }} 
        />
        <VenueMarker 
          type="stage" 
          title="Dance Arena" 
          position={{ top: "25%", left: "50%" }} 
        />
        <VenueMarker 
          type="food" 
          title="Food Court" 
          position={{ top: "50%", left: "33%" }} 
        />
        <VenueMarker 
          type="vip" 
          title="VIP Area" 
          position={{ top: "66%", left: "66%" }} 
        />
        <VenueMarker 
          type="facility" 
          title="Restrooms" 
          position={{ top: "50%", left: "66%" }} 
        />
        
        {/* User location - static position */}
        <UserLocationMarker position={{ top: "50%", left: "50%" }} />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10"></div>
      </div>
    </div>
  );
};

export default StaticMapDisplay;
