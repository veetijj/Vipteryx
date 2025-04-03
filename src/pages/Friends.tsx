
import React, { useState } from "react";
import { friends } from "@/data/friends";
import { Friend } from "@/types/friend";
import FriendCard from "@/components/friends/FriendCard";
import FriendSearch from "@/components/friends/FriendSearch";
import FriendProfile from "@/components/friends/FriendProfile";

const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="flex flex-col pt-6 pb-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      
      <FriendSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="space-y-3">
        {filteredFriends.length > 0 ? (
          filteredFriends.map(friend => (
            <FriendCard 
              key={friend.id} 
              friend={friend} 
              onClick={handleFriendSelect}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No friends found. Try a different search term.
          </div>
        )}
      </div>

      <FriendProfile 
        friend={selectedFriend} 
        onClose={() => setSelectedFriend(null)} 
      />
    </div>
  );
};

export default Friends;
