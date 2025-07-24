
import React from 'react';
import { TileStatus } from '../types.js';
import { Delete } from 'lucide-react';
const Key = ({ value, status, onClick }) => {
  const isWideKey = value.length > 1;

  const baseClasses =
    'h-14 rounded-md font-bold uppercase flex items-center justify-center cursor-pointer transition-colors duration-200 select-none';

  const statusClasses = {
    [TileStatus.CORRECT]: 'bg-green-500 text-white',
    [TileStatus.PRESENT]: 'bg-yellow-500 text-white',
    [TileStatus.ABSENT]: 'bg-slate-500 dark:bg-slate-700 text-white',
  };

  const defaultClasses = 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500';

  const keyClasses = `
    ${baseClasses}
    ${isWideKey ? 'px-4 text-xs flex-grow-[1.5]' : 'w-8 sm:w-10 flex-grow'}
    ${status ? statusClasses[status] : defaultClasses}
  `;

  return (
    <button className={keyClasses} onClick={() => onClick(value)}>
      {value === 'BACKSPACE' ? (
        <Delete className="w-5 h-5" />
      ) : (
        value
      )}
    </button>
  );
};

export default Key;