import React from "react";

interface VenueMarkerProps {
  type: string;
  title: string;
  position: {
    top: string;
    left: string;
  };
  className?: string; // Add className prop
  onClick?: () => void;
}

const getMarkerColor = (type: string): string => {
  switch (type) {
    case "stage": return "bg-red-500"; // Main stage red
    case "food": return "bg-orange-500"; // Food orange
    case "vip": return "bg-purple-500"; // VIP purple
    case "facility": return "bg-yellow-500"; // Bathrooms yellow
    case "dance": return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"; // Dance Arena multicolor
    default: return "bg-gray-500";
  }
};

const VenueMarker: React.FC<VenueMarkerProps> = ({ type, title, position, className, onClick }) => {
  const markerColor = getMarkerColor(type);
  
  return (
    <div 
      className={`absolute rounded-full border-2 border-white ${markerColor} ${className || "w-7 h-7"}`} // Default size reduced
      style={{ top: position.top, left: position.left }}
      title={title}
      onClick={() => {
        console.log(`Marker clicked: ${title}`);
        if (onClick) onClick();
      }}
    />
  );
};

export default VenueMarker;
