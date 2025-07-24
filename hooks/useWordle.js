
import { useState, useEffect, useCallback } from 'react';
import { GameStatus, TileStatus } from '../types.js';
import { MAX_GUESSES, WORD_LENGTH } from '../constants.js';
import { getNewWord, isWordValid } from '../services/wordService.js';

export const useWordle = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
  const [usedLetters, setUsedLetters] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const restartGame = useCallback(() => {
    setSolution(getNewWord());
    setGuesses(Array(MAX_GUESSES).fill(''));
    setCurrentGuessIndex(0);
    setGameStatus(GameStatus.PLAYING);
    setUsedLetters({});
  }, []);

  useEffect(() => {
    restartGame();
  }, [restartGame]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== GameStatus.PLAYING) return;

    if (key === 'ENTER') {
      const currentGuess = guesses[currentGuessIndex];
      if (currentGuess.length < WORD_LENGTH) {
        showToast('Not enough letters');
        return;
      }
      if (!isWordValid(currentGuess)) {
        showToast('Not in word list');
        return;
      }

      // Update used letters
      const newUsedLetters = { ...usedLetters };
      const solutionLetters = solution.split('');
      currentGuess.split('').forEach((letter, index) => {
        const currentStatus = newUsedLetters[letter];
        if (solutionLetters[index] === letter) {
          newUsedLetters[letter] = TileStatus.CORRECT;
        } else if (solution.includes(letter)) {
          if (currentStatus !== TileStatus.CORRECT) {
             newUsedLetters[letter] = TileStatus.PRESENT;
          }
        } else {
          newUsedLetters[letter] = TileStatus.ABSENT;
        }
      });
      setUsedLetters(newUsedLetters);

      // Check for win/loss
      if (currentGuess === solution) {
        setGameStatus(GameStatus.WON);
      } else if (currentGuessIndex === MAX_GUESSES - 1) {
        setGameStatus(GameStatus.LOST);
      }

      setCurrentGuessIndex(prev => prev + 1);
      return;
    }

    if (key === 'BACKSPACE') {
      setGuesses(prevGuesses => {
        const newGuesses = [...prevGuesses];
        newGuesses[currentGuessIndex] = newGuesses[currentGuessIndex].slice(0, -1);
        return newGuesses;
      });
      return;
    }

    if (guesses[currentGuessIndex].length < WORD_LENGTH) {
      setGuesses(prevGuesses => {
        const newGuesses = [...prevGuesses];
        newGuesses[currentGuessIndex] += key;
        return newGuesses;
      });
    }
  }, [guesses, currentGuessIndex, gameStatus, solution, usedLetters]);

  return { solution, guesses, currentGuessIndex, gameStatus, usedLetters, toast, handleKeyPress, restartGame };
};