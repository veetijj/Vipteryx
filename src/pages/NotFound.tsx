
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="festival-gradient text-white text-6xl font-bold h-24 w-24 rounded-full flex items-center justify-center mx-auto">
          404
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
