
import React, { useState } from "react";
import { Search, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import 'mapbox-gl/dist/mapbox-gl.css';

const EventMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const venues = [
    { id: "1", name: "Main Stage", type: "stage", distance: "250m", coordinates: [-74.005, 40.712] },
    { id: "2", name: "Dance Arena", type: "stage", distance: "400m", coordinates: [-74.008, 40.714] },
    { id: "3", name: "Food Court", type: "food", distance: "120m", coordinates: [-74.003, 40.711] },
    { id: "4", name: "VIP Area", type: "vip", distance: "350m", coordinates: [-74.006, 40.715] },
    { id: "5", name: "Restrooms", type: "facility", distance: "50m", coordinates: [-74.004, 40.713] },
  ];

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle venue selection
  const handleVenueSelect = (venueId: string) => {
    console.log(`Selected venue: ${venueId}`);
    // In a real app, this would center the map on the venue or highlight it
  };

  return (
    <div className="relative h-[calc(100vh-96px)]">
      {/* Static Map container */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Static festival map image */}
          <img 
            src="https://i.imgur.com/xG6vYGH.jpg" 
            alt="Festival Map" 
            className="w-full h-full object-cover"
          />
          
          {/* Map venue markers - static positions */}
          <div className="absolute top-1/3 left-1/4 w-5 h-5 rounded-full bg-purple-600 border-2 border-white" 
               title="Main Stage"></div>
          <div className="absolute top-1/4 left-1/2 w-5 h-5 rounded-full bg-purple-600 border-2 border-white" 
               title="Dance Arena"></div>
          <div className="absolute top-1/2 left-1/3 w-5 h-5 rounded-full bg-orange-500 border-2 border-white" 
               title="Food Court"></div>
          <div className="absolute top-2/3 left-2/3 w-5 h-5 rounded-full bg-yellow-500 border-2 border-white" 
               title="VIP Area"></div>
          <div className="absolute top-1/2 left-2/3 w-5 h-5 rounded-full bg-blue-500 border-2 border-white" 
               title="Restrooms"></div>
          
          {/* User location - static position */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white pulse"
               title="You are here"></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10"></div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="relative">
          <Input
            className="w-full pr-10 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
            placeholder="Search venues, stages, facilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2.5 right-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Bottom Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="secondary" 
            className="absolute bottom-4 left-4 right-4 shadow-lg h-12 bg-white/90 backdrop-blur-sm hover:bg-white/95 flex items-center justify-center text-sm font-medium z-10"
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
                        onClick={() => handleVenueSelect(venue.id)}
                      >
                        Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No venues found matching "{searchQuery}"
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Event Info Overlay */}
      <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border z-10">
        <h3 className="font-bold text-sm">Ostock</h3>
        <p className="text-xs text-muted-foreground mb-3">Helsinki, Finland</p>
        <div className="grid grid-cols-3 gap-2">
          <InfoItem label="Now at Main Stage" value="DJ Festivus" />
          <InfoItem label="Next Event" value="10:30 PM" />
          <InfoItem label="Weather" value="21° Clear" />
        </div>
      </div>

      {/* Add CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(3, 169, 244, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(3, 169, 244, 0); }
          100% { box-shadow: 0 0 0 0 rgba(3, 169, 244, 0); }
        }
        .pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

export default EventMap;
