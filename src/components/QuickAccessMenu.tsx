import React from "react";
import { Button } from "@/components/ui/button";
import { FaMusic, FaUtensils, FaStar, FaRestroom, FaCompactDisc } from "react-icons/fa"; // Import icons

interface QuickAccessMenuProps {
  onSelect: (locationId: string) => void;
}

const QuickAccessMenu: React.FC<QuickAccessMenuProps> = ({ onSelect }) => {
  const locations = [
    { id: "main-stage", name: "Main Stage", icon: <FaMusic /> },
    { id: "food-court", name: "Food Court", icon: <FaUtensils /> },
    { id: "vip-area", name: "VIP Area", icon: <FaStar /> },
    { id: "restrooms", name: "Restrooms", icon: <FaRestroom /> },
    { id: "dance-arena", name: "Dance Arena", icon: <FaCompactDisc /> },
  ];

  return (
    <div className="absolute top-4 left-4 right-4 flex overflow-x-auto space-x-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-20">
      {locations.map((location) => (
        <Button
          key={location.id}
          size="sm"
          variant="outline"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border-gray-300 hover:bg-gray-100"
          onClick={() => onSelect(location.id)}
        >
          <span className="text-lg">{location.icon}</span>
          <span className="text-sm font-medium">{location.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickAccessMenu;