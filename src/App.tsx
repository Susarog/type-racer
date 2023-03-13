import React, { useState, useEffect } from 'react';
import Typing from './components/Typing';
import Result from './components/Result';
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
    const newArr = [...listOfWords];
    newArr.sort(() => Math.random() - 0.5);
    setListOfWords(newArr);
  };
  useEffect(() => {
    setListOfWords(
      wordsDB['3000-common-words'].sort(() => Math.random() - 0.5)
    );
    setTime(30);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  }, []);
  if (!isDone) {
    return (
      <Typing
        time={time}
        setCharacters={setCharacters}
        setIsDone={setIsDone}
        listOfWords={listOfWords}
        resetTypeRacer={resetTypeRacer}
        characters={characters}
      />
    );
  } else {
    return <Result setIsDone={setIsDone} resetTypeRacer={resetTypeRacer} />;
  }
}

export default App;
