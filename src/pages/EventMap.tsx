import React, { useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

// Import components
import StaticMapDisplay from "@/components/map/StaticMapDisplay";
import SearchOverlay from "@/components/map/SearchOverlay";
import VenuesSheet from "@/components/map/VenuesSheet";
import EventInfoOverlay from "@/components/map/EventInfoOverlay";
import PulseAnimation from "@/components/map/PulseAnimation";
import FriendProfile from "@/components/friends/FriendProfile";
import VenueProfile from "@/components/map/VenueProfile"; // Import the new component
import { venues } from "@/components/map/data/venues";
import { Friend } from "@/types/friend";

const EventMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<{ name: string; distance: string } | null>(null); // Add state for selected venue

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle venue selection
  const handleVenueSelect = (venueId: string) => {
    console.log(`handleVenueSelect called with venueId: ${venueId}`); // Debug log
    const venue = venues.find(v => v.id === venueId); // Match venue ID
    if (venue) {
      console.log("Venue found:", venue); // Debug log
      setSelectedVenue({ name: venue.name, distance: venue.distance }); // Set selected venue
    } else {
      console.error("Venue not found for ID:", venueId); // Debug log
    }
  };

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseProfile = () => {
    setSelectedFriend(null);
  };

  const handleCloseVenueProfile = () => {
    setSelectedVenue(null); // Clear selected venue
  };

  return (
    <div className="relative h-[calc(100vh-96px)]">
      {/* Static Map */}
      <StaticMapDisplay 
        onFriendSelect={handleFriendSelect} 
        onVenueSelect={handleVenueSelect} // Pass handleVenueSelect to StaticMapDisplay
      />
      
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

      {/* Friend Profile */}
      <FriendProfile 
        friend={selectedFriend} 
        onClose={handleCloseProfile} 
      />

      {/* Venue Profile */}
      <VenueProfile 
        venue={selectedVenue} 
        onClose={handleCloseVenueProfile} 
      />

      {/* CSS for pulse animation */}
      <PulseAnimation />
    </div>
  );
};

export default EventMap;
