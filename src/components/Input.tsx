import React, { useState } from 'react';
import { PreviousWordArray } from '../../types';

const Input = ({ listOfWords }: { listOfWords: Array<string> }) => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [prevWord, setPrevWord] = useState<PreviousWordArray>([
    {
      word: '',
      isCorrect: true,
    },
  ]);
  const [input, setInput] = useState<string>('');
  const testFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value[event.target.value.length - 1] === ' ') {
      event.preventDefault();
      return;
    }
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && input.length !== 0) {
      const currentInputWord = input + event.key;
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentWord(`${listOfWords[currentWordIndex + 1]} `);
      setPrevWord(
        prevWord.concat({
          word: currentInputWord,
          isCorrect: currentInputWord === currentWord,
        })
      );
      setInput('');
      return;
    } else if (
      event.key === 'Backspace' &&
      input.length === 0 &&
      !prevWord[prevWord.length - 1].isCorrect
    ) {
      setInput(prevWord[prevWord.length - 1].word);
      setPrevWord(prevWord.slice(0, prevWord.length - 1));
      setCurrentWord(`${listOfWords[currentWordIndex - 1]} `);
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };
  return (
    <input
      type="text"
      value={input}
      onChange={testFunc}
      onKeyDown={insertWord}
    />
  );
};
export default Input;
