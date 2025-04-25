export interface Venue {
  id: string;
  name: string;
  type: string;
  distance: string;
  coordinates: [number, number];
}

export const venues: Venue[] = [
  { id: "main-stage", name: "Main Stage", type: "stage", distance: "250m", coordinates: [-74.005, 40.712] },
  { id: "dance-arena", name: "Dance Arena", type: "stage", distance: "300m", coordinates: [-74.008, 40.714] },
  { id: "food-court", name: "Food Court", type: "food", distance: "120m", coordinates: [-74.003, 40.711] },
  { id: "vip-area", name: "VIP Area", type: "vip", distance: "350m", coordinates: [-74.006, 40.715] },
  { id: "restrooms", name: "Restrooms", type: "facility", distance: "50m", coordinates: [-74.004, 40.713] }
];
