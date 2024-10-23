import React, { useEffect, useState } from 'react';
import Paylines from './PayLines'; // Ensure this file exports your Paylines array
import WinningLines from './WinningLines';

const symbols = ["🍒", "🍋", "🍊", "🔔", "⭐", "🍉"];
const SPIN_DURATION = 2000;

export default function SlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningCombination, setWinningCombination] = useState([]);
  const [spinCount, setSpinCount] = useState(0); // Track the number of spins
  const [winningCoords, setWinningCoords] = useState([]); // Store winning coordinates

  const initializeReels = () => {
    const firstSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => firstSymbol) // All symbols in a column match
    );
  };

  const [reels, setReels] = useState(initializeReels());


  const spinReels = () => {
    setIsSpinning(true);
    const newReels = initializeReels();
    setReels(newReels);
    const firstSymbols = newReels.map(column => column[0]); // Get first symbols

    setTimeout(() => {
      checkWin(firstSymbols);
      setIsSpinning(false);
      setSpinCount(prevCount => (prevCount + 1) % Paylines.length); // Update spin count and loop
    }, SPIN_DURATION);
  };

  const checkWin = (firstSymbols) => {
    const paylineIndex = spinCount; // Use the spin count to determine which payline to check
    const payline = Paylines[paylineIndex];

    const matches = payline.every(([reelIndex]) => {
      return firstSymbols[reelIndex] === firstSymbols[0]; // All first symbols match, so this is always true
    });

    if (matches) {
      setWinningCombination(payline);
      setWinningCoords(payline.map(([x, y]) => ({ x: 20 + x * 40, y: 20 + y * 60 }))); // Adjust coordinates
    } else {
      setWinningCombination([]); // This case will not happen since all spins are wins
      setWinningCoords([]);
    }
  };

  // Get the coordinates of the winning symbols
  const getWinningCoords = () => {
    const symbolWidth = 80; // Width of each symbol
    const symbolHeight = 80; // Height of each symbol
  
    return winningCombination.map(([reelIndex, rowIndex]) => ({
      x: reelIndex * symbolWidth + symbolWidth / 2, // Centering on symbol
      y: rowIndex * symbolHeight + symbolHeight / 2 ,     // Adjusting to bottom of the symbol
    }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">

      <div className="relative grid grid-cols-5 h-60">
         {/* Render Winning Lines */}
            {winningCoords.length > 0 && <WinningLines coords={getWinningCoords()} />}

        {reels.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col  gap-3 justify-center items-center w-20 ${colIndex % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'}`}
            >
            {column.map((symbol, rowIndex) => (
              <div key={rowIndex} className="flex z-10 items-center justify-center w-16 h-16">
                {symbol}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={spinReels}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      {winningCombination.length > 0 && (
        <div className="mt-4 text-green-500">
          You win with combination: {JSON.stringify(winningCombination)}
        </div>
      )}
    </div>
  );
}
