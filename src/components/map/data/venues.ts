
export interface Venue {
  id: string;
  name: string;
  type: string;
  distance: string;
  coordinates: [number, number];
}

export const venues: Venue[] = [
  { id: "1", name: "Main Stage", type: "stage", distance: "250m", coordinates: [-74.005, 40.712] },
  { id: "2", name: "Dance Arena", type: "stage", distance: "400m", coordinates: [-74.008, 40.714] },
  { id: "3", name: "Food Court", type: "food", distance: "120m", coordinates: [-74.003, 40.711] },
  { id: "4", name: "VIP Area", type: "vip", distance: "350m", coordinates: [-74.006, 40.715] },
  { id: "5", name: "Restrooms", type: "facility", distance: "50m", coordinates: [-74.004, 40.713] },
];
