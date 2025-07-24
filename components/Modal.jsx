
import React from 'react';
import { GameStatus } from '../types.js';

const Modal = ({ status, solution, onRestart }) => {
  if (status === GameStatus.PLAYING) return null;

  const isWinner = status === GameStatus.WON;
  const title = isWinner ? 'Congratulations!' : 'Nice Try!';
  const message = isWinner
    ? "You guessed the word correctly."
    : `The word was ${solution}.`;

  return (
    <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-20">
      <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-2xl text-center flex flex-col items-center animate-pop-in max-w-sm w-full mx-4">
        <h2 className={`text-3xl font-bold mb-2 ${isWinner ? 'text-green-500' : 'text-yellow-500'}`}>
          {title}
        </h2>
        <p className="text-lg mb-4 text-slate-700 dark:text-slate-200">
          {message}
        </p>
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;