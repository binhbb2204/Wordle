
import React from 'react';
import { Theme } from '../types.js';

const SunIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
      <h1 className="text-2xl sm:text-4xl font-bold tracking-wider uppercase">Wordle</h1>
      <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        {theme === Theme.LIGHT ? (
            <MoonIcon className="w-6 h-6" />
        ) : (
            <SunIcon className="w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Header;