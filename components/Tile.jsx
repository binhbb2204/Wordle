
import React from 'react';
import { TileStatus } from '../types.js';

const Tile = ({ letter, status, isCompleted, position }) => {
  const baseClasses = 'w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-3xl font-bold uppercase rounded-md transition-all duration-300';
  
  const statusClasses = {
    [TileStatus.EMPTY]: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900',
    [TileStatus.ABSENT]: 'bg-slate-400 dark:bg-slate-700 border-slate-400 dark:border-slate-700 text-white',
    [TileStatus.PRESENT]: 'bg-yellow-500 border-yellow-500 text-white',
    [TileStatus.CORRECT]: 'bg-green-500 border-green-500 text-white',
  };

  const animationClass = isCompleted ? 'animate-flip' : '';
  const animationDelay = isCompleted ? { animationDelay: `${position * 100}ms` } : {};
  const popInClass = letter && !isCompleted ? 'animate-pop-in' : '';
  
  const tileClasses = `${baseClasses} ${statusClasses[status]} ${animationClass} ${popInClass}`;

  return (
    <div className={tileClasses} style={animationDelay}>
      {letter}
    </div>
  );
};

export default Tile;