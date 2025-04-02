
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

const TicketsPage = () => {
  const tickets = [
    {
      id: "1",
      event: "Ostock",
      dates: "25-27 July 2023",
      location: "Helsinki, Finland",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "VIP",
      barcode: "1234567890"
    },
    {
      id: "2",
      event: "Blockfest",
      dates: "19-20 August 2023",
      location: "Tampere, Finland",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "Standard",
      barcode: "0987654321"
    }
  ];

  return (
    <div className="pb-20 px-4">
      <h1 className="text-2xl font-bold my-6">My Tickets</h1>
      
      <div className="space-y-8">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Upcoming Festivals</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
            <h3 className="font-medium">Art Exhibition Oulu</h3>
            <p className="text-xs text-muted-foreground mt-1">Sept 10-15, 2023</p>
            <Button variant="outline" size="sm" className="mt-3 w-full">View Details</Button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
            <h3 className="font-medium">Winter Festival</h3>
            <p className="text-xs text-muted-foreground mt-1">Dec 5-10, 2023</p>
            <Button variant="outline" size="sm" className="mt-3 w-full">View Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketCard = ({ ticket }: { ticket: any }) => {
  const [showTicket, setShowTicket] = React.useState(false);
  
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border">
      <div className="aspect-[4/1] relative overflow-hidden">
        <img 
          src={ticket.image} 
          alt={ticket.event} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div>
            <span className="bg-festival-purple text-white px-2 py-0.5 rounded-full text-xs font-medium">
              {ticket.type}
            </span>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{ticket.event}</h2>
            <div className="flex items-center text-white/80 text-xs mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{ticket.dates}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-start text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1 mt-0.5" />
            <span>{ticket.location}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowTicket(!showTicket)}
          >
            {showTicket ? "Hide" : "Show ticket"}
          </Button>
        </div>
        
        {showTicket && (
          <div className="border-t pt-4 mt-2">
            <div className="h-20 ticket-pattern rounded-lg flex flex-col items-center justify-center">
              <div className="font-mono text-lg">{ticket.barcode}</div>
              <div className="h-8 w-48 bg-black mt-2"></div>
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground">
              Scan this code at the entrance
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
