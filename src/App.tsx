import React, { useState, useEffect } from 'react';
import Typing from './components/Typing';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';

import { AllCharacterType } from '../types';
import wordsDB from '../db.json';

function App() {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [listOfWords, setListOfWords] = useState<Array<string>>([]);
  const [characters, setCharacters] = useState<AllCharacterType>({
    correct: 0,
    incorrect: 0,
    missed: 0,
  });

  const resetTypeRacer = () => {
    setIsDone(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
    const newArr = [...listOfWords];
    newArr.sort(() => Math.random() - 0.5);
    setListOfWords(newArr);
  };
  useEffect(() => {
    setListOfWords(wordsDB['commonWords'].sort(() => Math.random() - 0.5));
    setTime(30);
    setIsDone(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateRows: 'auto 1fr auto',
          maxWidth: '1200px',
          minHeight: '100vh',
        }}
      >
        <Header />
        {!isDone ? (
          <Typing
            time={time}
            setCharacters={setCharacters}
            setIsDone={setIsDone}
            listOfWords={listOfWords}
            resetTypeRacer={resetTypeRacer}
            characters={characters}
          />
        ) : (
          <Result
            characters={characters}
            time={time}
            resetTypeRacer={resetTypeRacer}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
