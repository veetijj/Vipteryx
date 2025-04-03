import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VenueItemProps {
  venue: {
    id: string;
    name: string;
    type: string;
    distance: string;
  };
  onSelect: (venueId: string) => void;
}

const VenueItem: React.FC<VenueItemProps> = ({ venue, onSelect }) => {
  return (
    <Card key={venue.id}>
      <CardContent className="p-3 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{venue.name}</h3>
          <p className="text-xs text-muted-foreground capitalize">{venue.type}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2">{venue.distance}</span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {}} // Remove the onSelect functionality
          >
            Route
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueItem;
