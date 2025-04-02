
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music, HeartPulse, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const upcomingEvents = [
    { 
      id: "1", 
      name: "Ostock", 
      date: "July 25-27, 2023", 
      location: "Helsinki, Finland", 
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    { 
      id: "2", 
      name: "Vectorama", 
      date: "June 6-8, 2023", 
      location: "Oulu, Finland", 
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
    { 
      id: "3", 
      name: "Blockfest", 
      date: "August 19-20, 2023", 
      location: "Tampere, Finland", 
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
  ];

  return (
    <div className="pb-20 px-4">
      {/* Hero Section */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-6 mt-4">
        <div className="absolute inset-0 festival-gradient opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Festival Companion</h1>
          <p className="text-sm mb-4 max-w-[250px]">Your personalized guide to the best festival experience</p>
          <Button variant="secondary" size="sm" className="bg-white text-festival-purple hover:bg-white/90">
            Explore Now
          </Button>
        </div>
        <div className="absolute right-0 bottom-0 w-32 h-32">
          <div className="w-full h-full bg-festival-pink opacity-30 rounded-full animate-pulse-soft absolute bottom-0 right-0"></div>
          <div className="w-24 h-24 bg-festival-blue opacity-30 rounded-full animate-pulse-soft absolute bottom-4 right-4"></div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Upcoming Events</h2>
          <Link to="/tickets" className="text-sm text-festival-purple flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border h-24"
            >
              <div className="w-1/3 h-full overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-md">{event.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-lg font-bold mb-4">Connect Your Services</h2>
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard 
            icon={<Music className="h-6 w-6 text-festival-purple" />}
            title="Music Services"
            description="Get personalized artist recommendations"
            to="/connected-apps"
          />
          <FeatureCard 
            icon={<HeartPulse className="h-6 w-6 text-festival-pink" />}
            title="Health Apps"
            description="Food & drink suggestions based on your health"
            to="/connected-apps"
          />
          <FeatureCard 
            icon={<CreditCard className="h-6 w-6 text-festival-blue" />}
            title="Payment Methods"
            description="Seamless payments throughout the venue"
            to="/profile"
          />
          <FeatureCard 
            icon={<MapPin className="h-6 w-6 text-festival-teal" />}
            title="Real-time Map"
            description="Never get lost at the venue"
            to="/map"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  to 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  to: string;
}) => {
  return (
    <Link to={to}>
      <Card className="hover:shadow-md transition-all h-full">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="mb-2 mt-2">{icon}</div>
          <h3 className="font-medium text-sm mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Home;
