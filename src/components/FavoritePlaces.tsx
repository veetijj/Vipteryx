import React from "react";
import { Button } from "@/components/ui/button";

interface FavoritePlacesProps {
  favorites: { id: string; name: string }[];
  onRemove: (id: string) => void;
}

const FavoritePlaces: React.FC<FavoritePlacesProps> = ({ favorites, onRemove }) => {
  return (
    <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md z-20">
      <h3 className="font-bold text-sm mb-2">My Places</h3>
      {favorites.length > 0 ? (
        <ul className="space-y-2">
          {favorites.map((place) => (
            <li key={place.id} className="flex justify-between items-center">
              <span>{place.name}</span>
              <Button size="xs" variant="outline" onClick={() => onRemove(place.id)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground">No places added yet.</p>
      )}
    </div>
  );
};

export default FavoritePlaces;