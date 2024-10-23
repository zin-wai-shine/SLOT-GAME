// WinningLines.js
import React from 'react';

const WinningLines = ({ coords }) => {
  return (
    <svg className="absolute z-0 inset-0 w-full h-full pointer-events-none">
      {/* Draw Dots */}
      {coords.map((coord, index) => (
        <circle
          key={`dot-${index}`}
          cx={coord.x}
          cy={coord.y}
          r="1" // Increase radius for better visibility
          fill="red" // Color of the dot
        />
      ))}

      {/* Draw Lines */}
      {coords.map((coord, index) => (
        index > 0 && ( // Start from the second dot
          <line
            key={`line-${index - 1}`} // Key should be based on the previous index
            x1={coords[index - 1].x} // Start from the previous dot's coordinates
            y1={coords[index - 1].y}
            x2={coord.x} // End at the current dot's coordinates
            y2={coord.y}
            stroke="grey" // Color of the line
            strokeWidth="3" // Adjust thickness of the line
            strokeLinecap="round" // Round edges for smoother look
          />
        )
      ))}
    </svg>
  );
};

export default WinningLines;
