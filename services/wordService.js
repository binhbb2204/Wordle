
import { WORD_LENGTH } from '../constants.js';

let wordList = [];
let wordSet = new Set();

/**
 * Fetches the word list from words.txt, processes it, and caches it.
 * This should be called once when the application initializes.
 */
export const loadWords = async () => {
  if (wordList.length > 0) {
    return; // Avoid re-fetching if words are already loaded
  }

  try {
    const response = await fetch('./words.txt');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    
    // Process the text file into a clean array of uppercase words
    const words = text
      .split(/\s+/) // Split by any whitespace (lines, spaces)
      .filter(Boolean) // Remove any empty strings from the array
      .map(w => w.toUpperCase());
    
    wordList = words;
    wordSet = new Set(words);
  } catch (error) {
    console.error("Failed to load word list:", error);
    // You could implement a fallback or display an error to the user here
  }
};

/**
 * Selects a new random word from the loaded list.
 * @returns {string} A random word for the new game.
 */
export const getNewWord = () => {
  if (wordList.length === 0) {
    console.error("Word list is not loaded yet. Call loadWords() first.");
    return 'REACT'; // Return a fallback word
  }
  const fiveLetterWords = wordList.filter(word => word.length === WORD_LENGTH);
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[randomIndex];
};

/**
 * Checks if a given word is in the valid word list.
 * @param {string} word The word to validate.
 * @returns {boolean} True if the word is valid, false otherwise.
 */
export const isWordValid = (word) => {
  return wordSet.has(word.toUpperCase());
};
