
import React from "react";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

const EventInfoOverlay: React.FC = () => {
  return (
    <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border z-10">
      <h3 className="font-bold text-sm">Ostock</h3>
      <p className="text-xs text-muted-foreground mb-3">Helsinki, Finland</p>
      <div className="grid grid-cols-3 gap-2">
        <InfoItem label="Now at Main Stage" value="DJ Festivus" />
        <InfoItem label="Next Event" value="10:30 PM" />
        <InfoItem label="Weather" value="21° Clear" />
      </div>
    </div>
  );
};

export default EventInfoOverlay;
