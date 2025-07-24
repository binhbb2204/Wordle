
import React from 'react';
import { WORD_LENGTH } from '../constants.js';
import { TileStatus } from '../types.js';
import Tile from './Tile.jsx';

const getTileStatuses = (guess, solution) => {
    if (guess.length === 0) return Array(WORD_LENGTH).fill(TileStatus.EMPTY);

    const statuses = Array(WORD_LENGTH).fill(TileStatus.ABSENT);
    const solutionLetters = solution.split('');
    const guessLetters = guess.split('');
    const solutionLetterCounts = {};

    solutionLetters.forEach(letter => {
        solutionLetterCounts[letter] = (solutionLetterCounts[letter] || 0) + 1;
    });

    // First pass for correct letters
    guessLetters.forEach((letter, index) => {
        if (solutionLetters[index] === letter) {
            statuses[index] = TileStatus.CORRECT;
            solutionLetterCounts[letter]--;
        }
    });

    // Second pass for present letters
    guessLetters.forEach((letter, index) => {
        if (statuses[index] !== TileStatus.CORRECT) {
            if (solution.includes(letter) && solutionLetterCounts[letter] > 0) {
                statuses[index] = TileStatus.PRESENT;
                solutionLetterCounts[letter]--;
            }
        }
    });

    return statuses;
};


const Row = ({ guess, isCurrentGuess, isCompleted, solution }) => {
  const letters = guess.padEnd(WORD_LENGTH, ' ').split('');
  const statuses = isCompleted ? getTileStatuses(guess, solution) : Array(WORD_LENGTH).fill(TileStatus.EMPTY);

  return (
    <div className={`grid grid-cols-5 gap-1.5 ${isCurrentGuess && guess.length < WORD_LENGTH ? 'animate-shake' : ''}`}>
      {letters.map((letter, i) => (
        <Tile
          key={i}
          letter={letter.trim()}
          status={statuses[i]}
          isCompleted={isCompleted}
          position={i}
        />
      ))}
    </div>
  );
};

export default Row;