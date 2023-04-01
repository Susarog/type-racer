import React, { useState, useEffect } from 'react';
import Typing from './components/Typing';
import Result from './components/Result';

import { WordInputArray, AllCharacterType } from './types';
import wordsDB from '../db.json';

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: 'blue',
      }}
    >
      Type Racer
    </div>
  );
};

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: 'blue',
      }}
    >
      Footer
    </div>
  );
};

function App() {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [listOfWords, setListOfWords] = useState<WordInputArray>([]);
  const [characters, setCharacters] = useState<AllCharacterType>({
    correct: 0,
    incorrect: 0,
    missed: 0,
  });

  const resetTypeRacer = () => {
    const wordInputArray: WordInputArray = wordsDB['commonWords'].map(
      (str) => ({
        word: str,
        status: 'inactive',
      })
    );
    wordInputArray.sort(() => Math.random() - 0.5);
    wordInputArray[0] = { ...wordInputArray[0], status: 'active' };
    setListOfWords(wordInputArray);
    setIsDone(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  };

  useEffect(() => {
    resetTypeRacer();
  }, []);

  return (
    <div className='container'>
      <div className='racing-page'>
        <Header />
        {!isDone ? (
          <Typing
            time={time}
            characters={characters}
            setCharacters={setCharacters}
            setIsDone={setIsDone}
            listOfWords={listOfWords}
            setListOfWords={setListOfWords}
            resetTypeRacer={resetTypeRacer}
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
