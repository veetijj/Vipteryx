
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchOverlayProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ searchQuery, setSearchQuery }) => {
  return (
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
  );
};

export default SearchOverlay;
