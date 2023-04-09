import { useState, useEffect } from "react";
import Typing from "./Typing";
import Result from "./Result";
import Timer from "./Timer";

import { WordInputArray, AllCharacterType } from "../types";
import wordsDB from "../../db.json";

const Content = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [wordList, setWordList] = useState<WordInputArray>([]);
  const [isTimerRunning, toggleIsTimerRunning] = useState(false);
  const [characters, setCharacters] = useState<AllCharacterType>({
    correct: 0,
    incorrect: 0,
    missed: 0,
  });

  const resetTypeRacer = () => {
    const wordInputArray: WordInputArray = wordsDB["commonWords"].map(
      (str) => ({
        word: str,
        inputtedWord: "",
        status: "inactive",
      })
    );
    wordInputArray.sort(() => Math.random() - 0.5);
    wordInputArray[0] = { ...wordInputArray[0], status: "active" };
    setWordList(wordInputArray);
    setIsDone(false);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });

    toggleIsTimerRunning(false);
    setTime(30);
  };

  useEffect(() => {
    resetTypeRacer();
  }, []);
  return (
    <>
      {!isDone ? (
        <Typing
          characters={characters}
          setCharacters={setCharacters}
          listOfWords={wordList}
          setListOfWords={setWordList}
          resetTypeRacer={resetTypeRacer}
          toggleIsTimerRunning={toggleIsTimerRunning}
        >
          <>{isTimerRunning && <Timer time={time} setIsDone={setIsDone} />}</>
        </Typing>
      ) : (
        <Result
          characters={characters}
          time={time}
          resetTypeRacer={resetTypeRacer}
        />
      )}
    </>
  );
};

export default Content;
