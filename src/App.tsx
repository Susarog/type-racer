import React, { useState, useEffect } from 'react';
import wordsDB from '../db.json';

function App() {
  const [numbers, setNumbers] = useState<boolean>(false);
  const [listOfWords, setListOfWords] = useState<Array<string>>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const insertWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputWord = event.target.value;
    if (currentWord === currentInputWord) {
      //prolly will need to update the error too if it is fixed.
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentWord(`${listOfWords[currentWordIndex + 1]} `);
      event.target.value = '';
    } else if (
      currentWord.substring(0, currentInputWord.length) === currentInputWord
    ) {
      //prolly will need to update the error too if it is fixed.
    } else {
      //prolly put form error stuff here
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
      <input onChange={insertWord} />
      <button onClick={() => setNumbers(!numbers)}>numbers</button>
      <button onClick={resetTypeRacer}>reset</button>
      <button> next test </button>
      <button>repeat</button>
    </div>
  );
}

export default App;
