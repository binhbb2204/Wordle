
import React, { useState, useEffect } from 'react';
import { GameStatus, Theme } from './types.js';
import { useWordle } from './hooks/useWordle.js';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import Keyboard from './components/Keyboard.jsx';
import Modal from './components/Modal.jsx';

const App = () => {
  const [theme, setTheme] = useState(Theme.LIGHT);
  const {
    solution,
    guesses,
    currentGuessIndex,
    gameStatus,
    usedLetters,
    toast,
    handleKeyPress,
    restartGame,
  } = useWordle();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== GameStatus.PLAYING) return;
      
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        handleKeyPress('ENTER');
      } else if (key === 'BACKSPACE') {
        handleKeyPress('BACKSPACE');
      } else if (key.length === 1 && key >= 'A' && key <= 'Z') {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, gameStatus]);
  

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <div className="flex flex-col h-screen font-sans text-slate-800 dark:text-slate-100">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-lg mx-auto px-2 pb-4">
        {toast && (
          <div className="absolute top-20 bg-slate-900 dark:bg-slate-200 text-white dark:text-black px-4 py-2 rounded-md shadow-lg animate-pop-in">
            {toast}
          </div>
        )}

        <Board
          guesses={guesses}
          currentGuessIndex={currentGuessIndex}
          solution={solution}
        />

        {gameStatus !== GameStatus.PLAYING && (
          <Modal
            status={gameStatus}
            solution={solution}
            onRestart={restartGame}
          />
        )}
      </main>
      
      <Keyboard usedLetters={usedLetters} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default App;