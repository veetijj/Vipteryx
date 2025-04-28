import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, HeartPulse } from "lucide-react";

const ConnectedApps = () => {
  const apps = [
    {
      id: "spotify",
      name: "Spotify",
      icon: "/lovable-uploads/cfcc7f02-bac3-4ed8-97b5-53b0214f137f.png", // Using the uploaded image
      description: "Sync your playlists",
      connected: true,
      logo: <Music className="h-6 w-6 text-white" />,
      color: "bg-green-500"
    },
    {
      id: "steam",
      name: "Steam",
      description: "Track your games",
      connected: false,
      logo: <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
      </svg>,
      color: "bg-blue-800"
    },
    {
      id: "apple-music",
      name: "Apple Music",
      description: "Sync your library",
      connected: false,
      logo: <Music className="h-6 w-6 text-white" />,
      color: "bg-pink-500"
    },
    {
      id: "health",
      name: "Health app",
      description: "Provides health data",
      connected: true,
      logo: <HeartPulse className="h-6 w-6 text-white" />,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="pb-20 px-4">
      <h1 className="text-2xl font-bold my-6">Connected Apps</h1>
      <p className="text-muted-foreground mb-6">
        Connect your accounts to get personalized recommendations for artists, food, and more.
      </p>
      
      <div className="space-y-4">
        {apps.map((app) => (
          <ConnectedAppCard key={app.id} app={app} />
        ))}
      </div>
      
      <div className="mt-8 bg-muted p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">About Connected Services</h3>
        <p className="text-xs text-muted-foreground">
          Connecting your services helps us provide the best festival experience. Your data is only used to enhance your experience and is never shared with third parties.
        </p>
      </div>
    </div>
  );
};

const ConnectedAppCard = ({ app }: { app: any }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className={`${app.color} h-12 w-12 rounded-full flex items-center justify-center mr-4`}>
            {app.logo}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{app.name}</h3>
            <p className="text-xs text-muted-foreground">{app.description}</p>
          </div>
          <Button 
            variant={app.connected ? "outline" : "default"}
            size="sm"
          >
            {app.connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedApps;
