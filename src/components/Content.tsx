import { useState, useEffect } from "react";
import Typing from "./Typing";
import Result from "./Result";
import { WordInputArray, TypingStats } from "../types";
import wordsDB from "../../db.json";

const Content = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [wordList, setWordList] = useState<WordInputArray>([]);
  const [isTimerRunning, toggleIsTimerRunning] = useState(false);
  const [typingStats, setTypingStats] = useState<TypingStats>([]);
  const resetTypeRacer = () => {
    const randomizedWordList = wordsDB["commonWords"]
      .sort(() => Math.random() - 0.5)
      .concat([]);
    setWordList(randomizedWordList);
    setIsDone(false);
    const stat = {
      correct: 0,
      missed: 0,
      incorrect: 0,
    };
    setTypingStats([
      {
        stat: stat,
        wpm: 0,
        acc: 0,
      },
    ]);
    toggleIsTimerRunning(false);
  };

  useEffect(() => {
    resetTypeRacer();
  }, []);
  return (
    <>
      {!isDone ? (
        <Typing
          typingStats={typingStats}
          setTypingStats={setTypingStats}
          wordList={wordList}
          resetTypeRacer={resetTypeRacer}
          isTimerRunning={isTimerRunning}
          toggleIsTimerRunning={toggleIsTimerRunning}
          timeLimit={timeLimit}
          setIsDone={setIsDone}
        />
      ) : (
        <Result typingStats={typingStats} resetTypeRacer={resetTypeRacer} />
      )}
    </>
  );
};

export default Content;
