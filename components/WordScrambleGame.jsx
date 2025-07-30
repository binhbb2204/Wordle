import React, { useEffect } from 'react';
import { GameStatus } from '../types.js';
import { useWordScramble } from '../hooks/useWordScramble.js';
import ScrambleBoard from './ScrambleBoard.jsx';
import Keyboard from './Keyboard.jsx';
import ScrambleModal from './ScrambleModal.jsx';

const WordScrambleGame = () => {
  const {
    solution,
    scrambledWord,
    currentGuess,
    gameStatus,
    lives,
    score,
    toast,
    handleKeyPress,
    restartGame,
    nextWord,
    shuffleCurrentWord
  } = useWordScramble();

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

  return (
    <>
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-lg mx-auto px-2 pb-4">
        {toast && (
          <div className="absolute top-32 bg-slate-900 dark:bg-slate-200 text-white dark:text-black px-4 py-2 rounded-md shadow-lg animate-pop-in z-40">
            {toast}
          </div>
        )}

        <ScrambleBoard
          scrambledWord={scrambledWord}
          currentGuess={currentGuess}
          lives={lives}
          score={score}
          onShuffle={shuffleCurrentWord}
        />

        {gameStatus !== GameStatus.PLAYING && (
          <ScrambleModal
            status={gameStatus}
            solution={solution}
            score={score}
            onRestart={restartGame}
            onNextWord={nextWord}
          />
        )}
      </main>
      
      <Keyboard usedLetters={{}} onKeyPress={handleKeyPress} />
    </>
  );
};

export default WordScrambleGame;
