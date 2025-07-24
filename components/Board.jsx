
import React from 'react';
import { MAX_GUESSES } from '../constants.js';
import Row from './Row.jsx';

const Board = ({ guesses, currentGuessIndex, solution }) => {
  return (
    <div className="grid grid-rows-6 gap-1.5 p-2">
      {Array.from({ length: MAX_GUESSES }).map((_, i) => {
        const isCurrentGuess = i === currentGuessIndex;
        const guess = guesses[i];
        
        return (
          <Row
            key={i}
            guess={guess}
            isCurrentGuess={isCurrentGuess}
            isCompleted={!isCurrentGuess && guess !== ''}
            solution={solution}
          />
        );
      })}
    </div>
  );
};

export default Board;