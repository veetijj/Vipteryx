import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VenueProfileProps {
  venue: { name: string; distance: string } | null;
  onClose: () => void;
}

const VenueProfile: React.FC<VenueProfileProps> = ({ venue, onClose }) => {
  if (!venue) {
    console.log("No venue selected"); // Debug log
    return null;
  }

  console.log("Rendering VenueProfile for:", venue); // Debug log

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 pb-20 md:pb-4 bg-background/95 backdrop-blur-sm border-t shadow-lg animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-xl">Venue Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg">{venue.name}</h3>
          <p className="text-sm text-muted-foreground">{venue.distance} away</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueProfile;
