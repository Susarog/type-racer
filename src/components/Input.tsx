import React, { useEffect, useState } from 'react';
import { PreviousWordArray } from '../../types';

const Input = ({
  listOfWords,
  setIsTypingValid,
  setCharacters,
  characters,
}: {
  listOfWords: Array<string>;
  setIsTypingValid: any;
  setCharacters: any;
  characters: any;
}) => {
  const [currentWord, setCurrentWord] = useState<string>(`${listOfWords[0]} `);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [prevWord, setPrevWord] = useState<PreviousWordArray>([
    {
      word: '',
      isCorrect: true,
    },
  ]);
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    setCurrentWord(`${listOfWords[0]} `);
    setCurrentWordIndex(0);
    setPrevWord([
      {
        word: '',
        isCorrect: true,
      },
    ]);
    setInput('');
    setIsTypingValid(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  }, [listOfWords]);
  const updateTextBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.at(event.target.value.length - 1) === ' ') {
      event.preventDefault();
      return;
    }
    setIsTypingValid(true);
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && input.length !== 0) {
      const currentInputWord = input + event.key;
      const isCorrect = currentInputWord === currentWord;
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentWord(`${listOfWords[currentWordIndex + 1]} `);
      setPrevWord(
        prevWord.concat({
          word: currentInputWord,
          isCorrect: isCorrect,
        })
      );
      if (isCorrect) {
        setCharacters({
          ...characters,
          correct: characters.correct + input.length,
        });
      } else if (!isCorrect && currentInputWord.length != currentWord.length) {
        setCharacters({
          ...characters,
          missed:
            characters.missed +
            Math.abs(currentWord.length - currentInputWord.length),
        });
      } else {
        let counter = 0;
        for (let i = 0; i < currentInputWord.length - 1; i++) {
          if (currentWord.at(i) !== currentInputWord.at(i)) {
            counter++;
          }
        }
        setCharacters({
          ...characters,
          incorrect: characters.incorrect + counter,
        });
      }
      setInput('');
      return;
    } else if (
      event.key === 'Backspace' &&
      input.length === 0 &&
      !prevWord[prevWord.length - 1].isCorrect
    ) {
      const inputWord = prevWord[prevWord.length - 1].word;
      const currWord = `${listOfWords[currentWordIndex - 1]} `;
      setInput(inputWord);
      setPrevWord(prevWord.slice(0, prevWord.length - 1));
      setCurrentWord(currWord);
      setCurrentWordIndex(currentWordIndex - 1);
      if (currWord.length != inputWord.length) {
        setCharacters({
          ...characters,
          missed:
            characters.missed - Math.abs(currWord.length - inputWord.length),
        });
      } else {
        let counter = 0;
        for (let i = 0; i < inputWord.length - 1; i++) {
          if (currWord.at(i) !== inputWord.at(i)) {
            counter++;
          }
        }
        setCharacters({
          ...characters,
          incorrect: characters.incorrect - counter,
        });
      }
    }
  };
  return (
    <input
      type="text"
      value={input}
      onChange={updateTextBox}
      onKeyDown={insertWord}
    />
  );
};
export default Input;
