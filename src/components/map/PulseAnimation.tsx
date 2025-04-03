
import React from "react";

const PulseAnimation: React.FC = () => {
  return (
    <style jsx>{`
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(3, 169, 244, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(3, 169, 244, 0); }
        100% { box-shadow: 0 0 0 0 rgba(3, 169, 244, 0); }
      }
      .pulse {
        animation: pulse 2s infinite;
      }
    `}</style>
  );
};

export default PulseAnimation;
