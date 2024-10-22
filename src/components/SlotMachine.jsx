import React, { useEffect, useState } from 'react';
import Paylines from './PayLines';

const symbols = ["🍒", "🍋", "🍊", "🔔", "⭐", "🍉"];

export default function SlotMachine() {
  const columnWidth = 80;  // Adjust based on actual width of your grid columns
  const rowHeight = 80;    // Adjust based on actual height of your grid rows

  // Initialize Reels
  const initializeReels = () => {
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)])
    );
  };

  // Reels State
  const [reels, setReels] = useState(initializeReels());
  const [winningCombination, setWinningCombination] = useState([]);
  const [showLines, setShowLines] = useState(false);

  // Check Win
  const checkWin = (newReels) => {
    const matches = Paylines.filter(payline => {
      const [firstRow] = newReels.map(row => row[payline[0][1]]);
      return payline.every(([reelIndex, rowIndex]) => {
        return (
          reelIndex < newReels.length &&
          rowIndex < newReels[reelIndex].length &&
          newReels[reelIndex][rowIndex] === firstRow
        );
      });
    });

    if (matches.length > 0) {
      const timeout = setTimeout(() => {
        setShowLines(true);
      }, 1000);
      setWinningCombination(matches[0]);
      return () => clearTimeout(timeout);
       // Highlight the first winning line found
    } else {
      setWinningCombination([]);
    }
  };

  const spinReels = () => {
    const newReels = initializeReels();
    setReels(newReels);
    checkWin(newReels);
  };


  // Get the coordinates of the winning symbols
  const getWinningCoords = () => {
    return winningCombination.map(([reelIndex, rowIndex]) => ({
      x: reelIndex * columnWidth + columnWidth / 2, // Center the dot in the column
      y: rowIndex * rowHeight + rowHeight / 2,      // Center the dot in the row
    }));
  };

  // Draw lines and dots based on winning coordinates
  const renderLinesAndDots = () => {
    const coords = getWinningCoords();
    return (
      <svg className="absolute z-0 inset-0 w-full h-full pointer-events-none">
        {/* Draw Dots */}
        {coords.map((coord, index) => (
          <circle
            key={`dot-${index}`}
            cx={coord.x}
            cy={coord.y}
            r="1" // Radius of the dot
            fill="red" // Color of the dot
          />
        ))}

        {/* Draw Lines */}
        {coords.map((coord, index) => (
          index < coords.length - 1 && (
            <line
              key={`line-${index}`}
              x1={coord.x}
              y1={coord.y}
              x2={coords[index + 1].x}
              y2={coords[index + 1].y}
              stroke="grey" // Color of the line
              strokeWidth="3"
              strokeLinecap="round"
            />
          )
        ))}
      </svg>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative grid grid-cols-5 h-60">
      
      {showLines && (
        renderLinesAndDots()
      )}
        {reels.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col gap-3  justify-center items-center w-20 ${colIndex % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'}`}
          >
            {column.map((symbol, rowIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center z-10 justify-center w-16 h-16 ${
                  winningCombination.some(([r, c]) => r === colIndex && c === rowIndex) ? "shake" : ""
                }`}
              >
                {symbol}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={spinReels}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Spin
      </button>
    </div>
  );
}
