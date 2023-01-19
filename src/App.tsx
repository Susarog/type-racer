import React, { useState, useEffect } from 'react';
import wordsDB from '../db.json';
import Timer from './components/Timer';
import Input from './components/Input';
function App() {
  const [numbers, setNumbers] = useState<boolean>(false);
  const [listOfWords, setListOfWords] = useState<Array<string>>([]);
  const resetTypeRacer = () => {
    const newArr = [...listOfWords];
    newArr.sort(() => Math.random() - 0.5);
    setListOfWords(newArr);
  };
  useEffect(() => {
    setListOfWords(
      wordsDB['3000-common-words'].sort(() => Math.random() - 0.5)
    );
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
      <Input listOfWords={listOfWords} />
      <button onClick={() => setNumbers(!numbers)}>numbers</button>
      <button onClick={resetTypeRacer}>reset</button>
      <button onClick={resetTypeRacer}> next test</button>
      <button>repeat</button>
      <Timer />
    </div>
  );
}

export default App;
