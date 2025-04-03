
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FriendSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4">
      <Input
        className="w-full pr-10"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute top-2.5 right-3 h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default FriendSearch;
