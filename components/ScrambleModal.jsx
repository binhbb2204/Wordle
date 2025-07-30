import React from 'react';
import { GameStatus } from '../types.js';

const ScrambleModal = ({ status, solution, score, onRestart, onNextWord }) => {
  if (status === GameStatus.PLAYING) return null;

  const isWon = status === GameStatus.WON;
  const title = isWon ? 'Congratulations!' : 'Nice Try!';
  const message = isWon
    ? "You unscrambled the word correctly!"
    : `The word was ${solution}.`;

  return (
    <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-20">
      <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-2xl text-center flex flex-col items-center animate-pop-in max-w-sm w-full mx-4">
        <h2 className={`text-3xl font-bold mb-2 ${isWon ? 'text-green-500' : 'text-yellow-500'}`}>
          {title}
        </h2>
        <p className="text-lg mb-2 text-slate-700 dark:text-slate-200">
          {message}
        </p>
        <p className="text-lg mb-4 text-slate-700 dark:text-slate-200">
          Score: <span className="font-bold">{score}</span>
        </p>
        
        <div className="flex flex-col space-y-3 w-full">
          {isWon && (
            <button
              onClick={onNextWord}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Next Word
            </button>
          )}
          
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            {isWon ? 'New Game' : 'Play Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrambleModal;
