import { useState, useEffect, useCallback } from 'react';
import { GameStatus } from '../types.js';
import { MAX_SCRAMBLE_LIVES, WORD_LENGTH } from '../constants.js';
import { getNewWord } from '../services/wordService.js';

const shuffleWord = (word) => {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('');
};

export const useWordScramble = () => {
  const [solution, setSolution] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
  const [lives, setLives] = useState(MAX_SCRAMBLE_LIVES);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const getNewScrambledWord = useCallback(() => {
    const newWord = getNewWord();
    let scrambled = shuffleWord(newWord);
    
    // Make sure the scrambled word is different from the original
    while (scrambled === newWord && newWord.length > 1) {
      scrambled = shuffleWord(newWord);
    }
    
    setSolution(newWord);
    setScrambledWord(scrambled);
  }, []);

  const shuffleCurrentWord = useCallback(() => {
    if (gameStatus !== GameStatus.PLAYING) return;
    
    let newScrambled = shuffleWord(scrambledWord);
    // Make sure it's different from current arrangement
    while (newScrambled === scrambledWord && scrambledWord.length > 1) {
      newScrambled = shuffleWord(scrambledWord);
    }
    setScrambledWord(newScrambled);
    showToast('Letters shuffled!');
  }, [scrambledWord, gameStatus]);

  const restartGame = useCallback(() => {
    setLives(MAX_SCRAMBLE_LIVES);
    setScore(0);
    setCurrentGuess('');
    setGameStatus(GameStatus.PLAYING);
    getNewScrambledWord();
  }, [getNewScrambledWord]);

  const nextWord = useCallback(() => {
    setCurrentGuess('');
    setGameStatus(GameStatus.PLAYING);
    getNewScrambledWord();
  }, [getNewScrambledWord]);

  useEffect(() => {
    restartGame();
  }, [restartGame]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== GameStatus.PLAYING) return;

    if (key === 'ENTER') {
      if (currentGuess.length < WORD_LENGTH) {
        showToast('Not enough letters');
        return;
      }

      if (currentGuess.toLowerCase() === solution.toLowerCase()) {
        setScore(prev => prev + 1);
        setGameStatus(GameStatus.WON);
        showToast('Correct! Well done!');
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives === 0) {
          setGameStatus(GameStatus.LOST);
          showToast(`Game Over! The word was: ${solution}`);
        } else {
          showToast(`Wrong! ${newLives} ${newLives === 1 ? 'life' : 'lives'} left`);
          setCurrentGuess('');
        }
      }
      return;
    }

    if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (currentGuess.length < WORD_LENGTH && key.length === 1 && key >= 'A' && key <= 'Z') {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameStatus, solution, lives]);

  return {
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
  };
};
