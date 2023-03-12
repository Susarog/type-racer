import React, { useState } from 'react';
import Timer from './Timer';
import Input from './Input';
const Typing = ({
  time,
  setCharacters,
  setIsDone,
  listOfWords,
  resetTypeRacer,
}: {
  time: number;
  setCharacters: any;
  setIsDone: any;
  listOfWords: Array<string>;
  resetTypeRacer: any;
}) => {
  const [numbers, setNumbers] = useState<boolean>(false);
  const [isTypingValid, setIsTypingValid] = useState<boolean>(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
      <div>
        <Input
          listOfWords={listOfWords}
          setIsTypingValid={setIsTypingValid}
          setCharacters={setCharacters}
        />
        <button onClick={() => setNumbers(!numbers)}>numbers</button>
        <button onClick={resetTypeRacer}>reset</button>
        <button onClick={resetTypeRacer}> next test</button>
        <button>repeat</button>
        {isTypingValid ? <Timer time={time} setIsDone={setIsDone} /> : null}
      </div>
    </div>
  );
};

export default Typing;
