import React, { useEffect, useState } from 'react';
import Paylines from './PayLines';
import WinningLines from './WinningLines';
import BetOptions from './BetOptions';
import { FaArrowsSpin } from "react-icons/fa6";
import { motion } from "framer-motion";
import spinSound from '../song/mixkit-slot-machine-wheel-1932.wav';
import winSound from '../song/mixkit-slot-machine-win-alert-1931.wav';
import loseSound from '../song/mixkit-retro-arcade-lose-2027.wav';
import Symbols from './Symbols'; // Import the new Symbols array with SVGs

const SPIN_DURATION = 2000;

export default function SlotMachine() {
  const initializeReels = () => {
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 3 }, () => Symbols[Math.floor(Math.random() * Symbols.length)])
    );
  };

  const [reels, setReels] = useState(initializeReels());
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningCombination, setWinningCombination] = useState([]);
  const [showLines, setShowLines] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [activePaylines, setActivePaylines] = useState(1);
  const [autoSpin, setAutoSpin] = useState(false);

  const startSpinSound = new Audio(spinSound);
  const startWinSound = new Audio(winSound);
  const startLoseSound = new Audio(loseSound);

  const smoothScrollReel = (reelIndex, finalSymbols) => {
    setShowLines(false);
    const maxSpins = SPIN_DURATION / 100;
    let spinCount = 0;

    const scrollInterval = setInterval(() => {
      setReels(prevReels => {
        const updatedReels = [...prevReels];
        updatedReels[reelIndex] = [
          Symbols[Math.floor(Math.random() * Symbols.length)],
          ...updatedReels[reelIndex].slice(0, -1),
        ];
        return updatedReels;
      });

      spinCount++;

      if (spinCount >= maxSpins) {
        clearInterval(scrollInterval);
        setReels(prevReels => {
          const updatedReels = [...prevReels];
          updatedReels[reelIndex] = finalSymbols;
          return updatedReels;
        });
      }
    }, 100);
  };

  const spinReels = () => {
    startSpinSound.play();
    setIsSpinning(true);
    const newReels = initializeReels();

    newReels.forEach((reel, reelIndex) => {
      setTimeout(() => {
        smoothScrollReel(reelIndex, reel);
      }, reelIndex * 500);
    });

    setTimeout(() => {
      checkWin(newReels);
      setIsSpinning(false);
    }, SPIN_DURATION + 500 * (newReels.length - 1));
  };

  const checkWin = (newReels) => {
    const matches = Paylines.filter(payline => {
      const firstSymbol = newReels[payline[0][0]][payline[0][1]];

      return payline.every(([reelIndex, rowIndex]) => {
        return (
          reelIndex < newReels.length &&
          rowIndex < newReels[reelIndex].length &&
          newReels[reelIndex][rowIndex] === firstSymbol
        );
      });
    });

    if (matches.length > 0) {
      startWinSound.play();
      setShowLines(true);
      setTimeout(() => {
        setShowLines(false);
      }, startWinSound.duration * 1000);
      setWinningCombination(matches[0]);
    } else {
      startLoseSound.play();
      setWinningCombination([]);
    }
  };

  const getWinningCoords = () => {
    const symbolWidth = 80;
    const symbolHeight = 80;
  
    return winningCombination.map(([reelIndex, rowIndex]) => ({
      x: reelIndex * symbolWidth + symbolWidth / 2,
      y: rowIndex * symbolHeight + symbolHeight / 2,
    }));
  };

  useEffect(() => {
    let autoSpinInterval;
    if (autoSpin && !isSpinning) {
      autoSpinInterval = setInterval(() => {
        if (!isSpinning) {
          spinReels();
        }
      }, SPIN_DURATION + 500);
    }
    return () => {
      clearInterval(autoSpinInterval);
    };
  }, [autoSpin, isSpinning]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-slate-600">
      <div className="relative grid grid-cols-5 w-[40%] h-60">
        {/* {showLines && <WinningLines coords={getWinningCoords()} />} */}
        {reels.map((column, colIndex) => (
          <div key={colIndex} className={`slot-reel flex flex-col gap-3 justify-center items-center w-20`}>
            {column.map((symbol, rowIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`symbol ${
                  winningCombination.some(([r, c]) => r === colIndex && c === rowIndex)
                    ? (showLines ? "grow-shrink" : "")
                    : ""
                }`}
              >
                <img src={symbol} alt={`slot-symbol-${rowIndex}`} className="h-16 w-16" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='flex justify-center items-end gap-10 mt-5'>
        <BetOptions
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          activePaylines={activePaylines}
          setActivePaylines={setActivePaylines}
        />

        <div className='flex justify-center items-end gap-1'>
          <button
            className={`h-10 bg-gradient-to-r ${autoSpin ? "text-red-500" : "text-white"} from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 text-center me-2`}
            onClick={() => setAutoSpin(!autoSpin)}
          >
            Auto
          </button>

          <button
            onClick={spinReels}
            className="h-10 text-white bg-gradient-to-r text-2xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 text-center me-2"
            disabled={isSpinning}
          >
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 2, repeat: Infinity }}
              >
                <FaArrowsSpin />
              </motion.div>
            ) : (
              <FaArrowsSpin />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
