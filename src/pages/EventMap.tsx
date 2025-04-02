
import React, { useState } from "react";
import { Search, Layers, Navigation, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const EventMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const venues = [
    { id: "1", name: "Main Stage", type: "stage", distance: "250m" },
    { id: "2", name: "Dance Arena", type: "stage", distance: "400m" },
    { id: "3", name: "Food Court", type: "food", distance: "120m" },
    { id: "4", name: "VIP Area", type: "vip", distance: "350m" },
    { id: "5", name: "Restrooms", type: "facility", distance: "50m" },
  ];

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-[calc(100vh-96px)]">
      {/* Map Placeholder - In a real app, this would be replaced by an actual map component */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
        <img 
          src="https://i.imgur.com/95jDEgU.png" 
          alt="Festival Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Current Position Indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-5 w-5 bg-festival-blue rounded-full animate-pulse relative">
            <div className="absolute inset-0 bg-festival-blue opacity-50 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4">
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
      
      {/* Map Controls */}
      <div className="absolute top-16 right-4 flex flex-col space-y-2">
        <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
          <Layers className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Bottom Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="secondary" 
            className="absolute bottom-4 left-4 right-4 shadow-lg h-12 bg-white/90 backdrop-blur-sm hover:bg-white/95 flex items-center justify-center text-sm font-medium"
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
                      <Button size="sm" variant="outline">
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
      <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
        <h3 className="font-bold text-sm">Ostock</h3>
        <p className="text-xs text-muted-foreground mb-3">Helsinki, Finland</p>
        <div className="grid grid-cols-3 gap-2">
          <InfoItem label="Now at Main Stage" value="DJ Festivus" />
          <InfoItem label="Next Event" value="10:30 PM" />
          <InfoItem label="Weather" value="21° Clear" />
        </div>
      </div>
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
