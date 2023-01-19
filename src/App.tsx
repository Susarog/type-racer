import React, { useState, useEffect } from 'react';
import wordsDB from '../db.json';
import Timer from './components/Timer';
import { PreviousWord, PreviousWordArray } from '../types';

function App() {
  const [input, setInput] = useState<string>('');
  const [numbers, setNumbers] = useState<boolean>(false);
  const [listOfWords, setListOfWords] = useState<Array<string>>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [charCounter, setCharCounter] = useState<number>(0);
  const [prevWord, setPrevWord] = useState<PreviousWordArray>([
    {
      word: '',
      isCorrect: true,
    },
  ]);
  const testFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value[event.target.value.length - 1] === ' ') {
      return;
    }
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && input.length !== 0) {
      const currentInputWord = input + event.key;
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentWord(`${listOfWords[currentWordIndex + 1]} `);
      setCharCounter(charCounter + currentInputWord.length);
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
  const resetTypeRacer = () => {
    const temp = wordsDB['3000-common-words'].sort(() => Math.random() - 0.5);
    setListOfWords(temp);
    setCurrentWord(`${temp[0]} `);
  };
  useEffect(() => {
    resetTypeRacer();
  }, []);

  return (
    <div>
      <div
        style={{
          fontSize: '1.5rem',
          width: '900px',
          height: '140px',
          overflow: 'hidden',
        }}
      >
        {listOfWords.map((word) => (
          <span key={word}>{word} </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={testFunc}
        onKeyDown={insertWord}
      />
      <button onClick={() => setNumbers(!numbers)}>numbers</button>
      <button onClick={resetTypeRacer}>reset</button>
      <button> next test </button>
      <button>repeat</button>
      <Timer />
    </div>
  );
}

export default App;
