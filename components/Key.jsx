
import React from 'react';
import { TileStatus } from '../types.js';

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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 002.828 0L19 12M3 12l6.414-6.414a2 2 0 012.828 0L19 12" />
        </svg>
      ) : (
        value
      )}
    </button>
  );
};

export default Key;