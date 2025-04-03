
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import { useState, useEffect } from "react";

const Layout = () => {
  const [statusBarHeight, setStatusBarHeight] = useState("40px");

  useEffect(() => {
    // Simulate different status bar heights based on platform
    // In a real app with React Native, this would use Platform.OS and actual status bar heights
    const handleResize = () => {
      setStatusBarHeight("40px"); // Fixed for our web demo
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Status bar simulation */}
      <div 
        style={{ height: statusBarHeight }}
        className="bg-black text-white flex items-center justify-between px-4 text-xs"
      >
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      
      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
