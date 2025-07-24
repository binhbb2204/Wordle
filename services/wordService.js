
import { VALID_WORDS } from '../data/words.js';
import { WORD_LENGTH } from '../constants.js';

export const getNewWord = () => {
  const fiveLetterWords = VALID_WORDS.filter(word => word.length === WORD_LENGTH);
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[randomIndex];
};

export const isWordValid = (word) => {
  return VALID_WORDS.includes(word.toUpperCase());
};