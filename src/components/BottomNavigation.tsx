
import { NavLink } from "react-router-dom";
import { Home, User, Ticket, Map, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  return (
    <div className="h-16 border-t bg-white dark:bg-gray-900 flex items-center justify-around px-4">
      <NavItem to="/" icon={<Home />} label="Home" />
      <NavItem to="/profile" icon={<User />} label="Profile" />
      <NavItem to="/tickets" icon={<Ticket />} label="Tickets" />
      <NavItem to="/map" icon={<Map />} label="Map" />
      <NavItem to="/connected-apps" icon={<Link2 />} label="Connect" />
    </div>
  );
};

const NavItem = ({ 
  to, 
  icon, 
  label 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string;
}) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex flex-col items-center justify-center p-1 transition-all",
          isActive 
            ? "text-festival-purple" 
            : "text-gray-500 hover:text-festival-blue"
        )
      }
    >
      <div className="w-6 h-7 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default BottomNavigation;
