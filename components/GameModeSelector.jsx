import React from 'react';
import { GameMode } from '../types.js';

const GameModeSelector = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1 mx-4">
      <button
        onClick={() => onModeChange(GameMode.WORDLE)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          currentMode === GameMode.WORDLE
            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        Wordle
      </button>
      <button
        onClick={() => onModeChange(GameMode.WORD_SCRAMBLE)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          currentMode === GameMode.WORD_SCRAMBLE
            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        Word Scramble
      </button>
    </div>
  );
};

export default GameModeSelector;
