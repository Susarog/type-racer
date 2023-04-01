import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { WordInputArray, AllCharacterType } from '../types';
const Typing = ({
  time,
  characters,
  setCharacters,
  setIsDone,
  listOfWords,
  setListOfWords,
  resetTypeRacer,
}: {
  time: number;
  characters: AllCharacterType;
  setCharacters: React.Dispatch<React.SetStateAction<AllCharacterType>>;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  listOfWords: WordInputArray;
  setListOfWords: React.Dispatch<React.SetStateAction<WordInputArray>>;
  resetTypeRacer: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [isTypingValid, setIsTypingValid] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    setCurrentWordIndex(0);
    setInput('');
    setIsTypingValid(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  }, []);
  const updateTextBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.at(-1) === ' ') {
      return;
    }
    setIsTypingValid(true);
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && input.length !== 0) {
      const isCorrect = input === listOfWords[currentWordIndex].word;
      setCurrentWordIndex(currentWordIndex + 1);
      setListOfWords(
        listOfWords.map((word, i) => {
          if (currentWordIndex === i) {
            return {
              ...word,
              status: isCorrect ? 'correct' : 'incorrect',
            };
          }
          if (currentWordIndex + 1 === i) {
            return {
              ...word,
              status: 'active',
            };
          }
          return word;
        })
      );
      setInput('');
      return;
    } else if (
      event.key === 'Backspace' &&
      input.length === 0 &&
      currentWordIndex !== 0 &&
      listOfWords[currentWordIndex - 1].status === 'incorrect'
    ) {
      const prevIndex = currentWordIndex - 1;
      setCurrentWordIndex(prevIndex);
      setListOfWords(
        listOfWords.map((word, i) => {
          if (prevIndex === i) {
            return {
              ...word,
              status: 'active',
            };
          }
          if (currentWordIndex === i) {
            return {
              ...word,
              status: 'inactive',
            };
          }
          return word;
        })
      );
      setInput('');
    }
  };
  return (
    <div className='content'>
      <div className='word-container'>
        {listOfWords.map((word, i) => {
          return (
            <div
              key={i}
              className={
                word.status !== 'inactive' ? `${word.status} word` : 'word'
              }
            >
              {word.word}
            </div>
          );
        })}
      </div>
      <div>
        <input
          value={input}
          onChange={updateTextBox}
          onKeyDown={insertWord}
          ref={(input) => input && input.focus()}
        />
        <button onClick={resetTypeRacer}>Reset</button>
        {isTypingValid ? <Timer time={time} setIsDone={setIsDone} /> : null}
      </div>
    </div>
  );
};

export default Typing;
