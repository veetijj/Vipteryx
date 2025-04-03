
import React, { useState, useEffect, useRef } from "react";
import { Search, Layers, Navigation, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Temporary access token input component
const MapboxTokenInput = ({ onTokenSubmit }: { onTokenSubmit: (token: string) => void }) => {
  const [token, setToken] = useState('');
  
  return (
    <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 z-50 flex flex-col gap-2">
      <h3 className="text-sm font-medium">Enter your Mapbox access token to view the map</h3>
      <div className="flex gap-2">
        <Input 
          value={token} 
          onChange={(e) => setToken(e.target.value)} 
          placeholder="pk.eyJ1..." 
          className="flex-1"
        />
        <Button onClick={() => onTokenSubmit(token)}>Set Token</Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Get your token at <a href="https://mapbox.com/" className="underline" target="_blank" rel="noreferrer">mapbox.com</a>
      </p>
    </div>
  );
};

const EventMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapboxToken, setMapboxToken] = useState<string | null>(
    localStorage.getItem('mapbox_token')
  );
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
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

  // Handle map token submission
  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapboxToken(token);
  };

  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-74.005, 40.712], // Festival location (NYC for demo)
        zoom: 15,
        pitch: 40,
      });
      
      // Add navigation controls
      newMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      
      // Add markers for venues
      venues.forEach(venue => {
        const el = document.createElement('div');
        el.className = 'venue-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        
        // Color based on venue type
        switch(venue.type) {
          case 'stage':
            el.style.backgroundColor = '#8a2be2'; // Purple for stages
            break;
          case 'food':
            el.style.backgroundColor = '#ff9800'; // Orange for food
            break;
          case 'vip':
            el.style.backgroundColor = '#ffd700'; // Gold for VIP
            break;
          default:
            el.style.backgroundColor = '#03a9f4'; // Blue for others
        }
        
        el.style.border = '2px solid #ffffff';
        
        new mapboxgl.Marker(el)
          .setLngLat(venue.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${venue.name}</h3><p>${venue.type}</p>`)
          )
          .addTo(newMap);
      });
      
      // Add user location (simulated)
      const userEl = document.createElement('div');
      userEl.className = 'user-marker pulse';
      userEl.style.width = '16px';
      userEl.style.height = '16px';
      userEl.style.borderRadius = '50%';
      userEl.style.backgroundColor = '#03a9f4';
      userEl.style.border = '3px solid #ffffff';
      
      new mapboxgl.Marker(userEl)
        .setLngLat([-74.005, 40.712])
        .addTo(newMap);
        
      map.current = newMap;
    } catch (error) {
      console.error('Error initializing map:', error);
    }
    
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="relative h-[calc(100vh-96px)]">
      {/* Map container */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" ref={mapContainer}>
        {!mapboxToken && (
          <MapboxTokenInput onTokenSubmit={handleTokenSubmit} />
        )}
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
      
      {/* Map Controls */}
      <div className="absolute top-16 right-4 flex flex-col space-y-2 z-10">
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white/90 backdrop-blur-sm shadow-lg"
          onClick={() => map.current?.setStyle('mapbox://styles/mapbox/' + 
            (map.current?.getStyle().name.includes('Dark') ? 'light' : 'dark') + '-v11')}
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white/90 backdrop-blur-sm shadow-lg"
          onClick={() => {
            if (map.current) {
              map.current.flyTo({
                center: [-74.005, 40.712],
                zoom: 15,
                bearing: 0,
                pitch: 40,
                duration: 1500
              });
            }
          }}
        >
          <Navigation className="h-4 w-4" />
        </Button>
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
                        onClick={() => {
                          const venueCoords = venues.find(v => v.id === venue.id)?.coordinates;
                          if (venueCoords && map.current) {
                            map.current.flyTo({
                              center: venueCoords,
                              zoom: 18,
                              duration: 1000
                            });
                          }
                        }}
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
