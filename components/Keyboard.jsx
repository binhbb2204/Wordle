import React from 'react';
import { KEYBOARD_LAYOUT } from '../constants.js';
import Key from './Key.jsx';

const Keyboard = ({ usedLetters, onKeyPress }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center pb-4 pt-2 px-1">
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className="flex justify-center my-1 w-full gap-1">
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              status={usedLetters[key]}
              onClick={onKeyPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
