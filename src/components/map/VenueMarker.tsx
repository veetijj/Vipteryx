import React from "react";

interface VenueMarkerProps {
  type: string;
  title: string;
  position: {
    top: string;
    left: string;
  };
  onClick?: () => void; // Add optional onClick prop
}

const getMarkerColor = (type: string): string => {
  switch (type) {
    case "stage": return "bg-purple-600";
    case "food": return "bg-orange-500";
    case "vip": return "bg-yellow-500";
    case "facility": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

const VenueMarker: React.FC<VenueMarkerProps> = ({ type, title, position, onClick }) => {
  const markerColor = getMarkerColor(type);
  
  return (
    <div 
      className={`absolute w-5 h-5 rounded-full ${markerColor} border-2 border-white`} 
      style={{ top: position.top, left: position.left }}
      title={title}
      onClick={() => {
        console.log(`Marker clicked: ${title}`); // Debug log
        if (onClick) onClick(); // Trigger onClick if provided
      }}
    />
  );
};

export default VenueMarker;
