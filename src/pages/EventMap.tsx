
import React, { useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

// Import components
import StaticMapDisplay from "@/components/map/StaticMapDisplay";
import SearchOverlay from "@/components/map/SearchOverlay";
import VenuesSheet from "@/components/map/VenuesSheet";
import EventInfoOverlay from "@/components/map/EventInfoOverlay";
import PulseAnimation from "@/components/map/PulseAnimation";
import { venues } from "@/components/map/data/venues";

const EventMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
      {/* Static Map */}
      <StaticMapDisplay />
      
      {/* Search Bar */}
      <SearchOverlay 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      {/* Venues Bottom Sheet */}
      <VenuesSheet 
        venues={venues}
        filteredVenues={filteredVenues}
        searchQuery={searchQuery}
        onVenueSelect={handleVenueSelect}
      />
      
      {/* Event Info Panel */}
      <EventInfoOverlay />

      {/* CSS for pulse animation */}
      <PulseAnimation />
    </div>
  );
};

export default EventMap;
