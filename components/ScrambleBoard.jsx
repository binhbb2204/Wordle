import React from 'react';
import { Shuffle, Heart } from 'lucide-react';

const ScrambleBoard = ({ 
  scrambledWord, 
  currentGuess, 
  lives, 
  score, 
  onShuffle 
}) => {
  const renderScrambledLetters = () => {
    return scrambledWord.split('').map((letter, index) => (
      <div
        key={index}
        className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-slate-300 dark:border-slate-600 
                   bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center 
                   text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mx-1"
      >
        {letter}
      </div>
    ));
  };

  const renderGuessLetters = () => {
    const letters = currentGuess.split('');
    const emptySlots = 5 - letters.length;

    return (
      <>
        {letters.map((letter, index) => (
          <div
            key={index}
            className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-slate-400 dark:border-slate-500 
                       bg-white dark:bg-slate-800 rounded-md flex items-center justify-center 
                       text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mx-1
                       animate-pop-in"
          >
            {letter}
          </div>
        ))}
        {Array(emptySlots).fill(null).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-slate-300 dark:border-slate-600 
                       bg-white dark:bg-slate-800 rounded-md flex items-center justify-center mx-1"
          />
        ))}
      </>
    );
  };

  const renderLives = () => {
    return Array(3).fill(null).map((_, index) => (
      <Heart
        key={index}
        className={`w-6 h-6 mx-1 ${
          index < lives 
            ? 'text-red-500 fill-red-500' 
            : 'text-slate-300 dark:text-slate-600'
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Score and Lives */}
      <div className="flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
        <div className="flex items-center">
          {renderLives()}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold mb-2">Unscramble the word!</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Use the letters below to form a 5-letter word
        </p>
      </div>

      {/* Scrambled Letters */}
      <div className="flex flex-col items-center justify-center mb-6 space-y-4">
        <div className="flex items-center justify-center">
          {renderScrambledLetters()}
        </div>

        {/* Current Guess */}
        <div className="flex items-center justify-center">
          {renderGuessLetters()}
        </div>

        {/* Shuffle Button */}
        <button
          onClick={onShuffle}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md 
                     transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
          title="Shuffle letters"
        >
          <Shuffle className="w-4 h-4" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Type your guess and press ENTER
      </div>
    </div>
  );
};

export default ScrambleBoard;
