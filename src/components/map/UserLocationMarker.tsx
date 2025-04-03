
import React from "react";

interface UserLocationMarkerProps {
  position: {
    top: string;
    left: string;
  };
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ position }) => {
  return (
    <div 
      className="absolute w-4 h-4 rounded-full bg-blue-500 border-2 border-white pulse"
      style={{ top: position.top, left: position.left }}
      title="You are here"
    />
  );
};

export default UserLocationMarker;
