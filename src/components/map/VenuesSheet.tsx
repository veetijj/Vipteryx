
import React from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import VenueItem from "./VenueItem";

interface Venue {
  id: string;
  name: string;
  type: string;
  distance: string;
  coordinates: [number, number];
}

interface VenuesSheetProps {
  venues: Venue[];
  filteredVenues: Venue[];
  searchQuery: string;
  onVenueSelect: (venueId: string) => void;
}

const VenuesSheet: React.FC<VenuesSheetProps> = ({ 
  venues, 
  filteredVenues, 
  searchQuery, 
  onVenueSelect 
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="secondary" 
          className="absolute bottom-4 left-4 right-4 shadow-lg h-12 bg-black/90 backdrop-blur-sm hover:bg-white/95 flex items-center justify-center text-sm font-medium z-10"
        >
          <span>Nearby Venues</span>
          <ChevronUp className="ml-1 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-0 max-h-[70%]">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Nearby Venues</h2>
          <p className="text-sm text-muted-foreground">Discover what's around you</p>
        </div>
        
        <div className="p-4 space-y-3 max-h-[calc(70vh-80px)] overflow-y-auto">
          {filteredVenues.length > 0 ? (
            filteredVenues.map(venue => (
              <VenueItem 
                key={venue.id} 
                venue={venue} 
                onSelect={onVenueSelect} 
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No venues found matching "{searchQuery}"
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VenuesSheet;
