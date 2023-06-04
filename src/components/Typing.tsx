import { useEffect, useState, useRef, memo } from "react";
import { WordInputArray, TypingStats, Stat } from "../types";
import useTimer from "../hooks/useTimer";

/* eslint-disable react/display-name */
const AllWords = memo(({ wordList }: { wordList: WordInputArray }) => {
  return (
    <>
      {wordList.map((word, i) => {
        return (
          <div key={word + i} className="word">
            {word.split("").map((char, i) => {
              return <span key={char + i}>{char}</span>;
            })}
          </div>
        );
      })}
    </>
  );
});

interface TypingProps {
  typingStats: TypingStats;
  setTypingStats: React.Dispatch<React.SetStateAction<TypingStats>>;
  wordList: WordInputArray;
  resetTypeRacer: React.MouseEventHandler<HTMLDivElement>;
  isTimerRunning: boolean;
  toggleIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timeLimit: number;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PreviousWord {
  word: string;
  prevIndex: number;
  isCorrect: boolean;
}
type PreviousWordArray = Array<PreviousWord>;

interface Timer {
  time: number;
  play: () => void;
  stop: () => void;
}

const Typing = ({
  typingStats,
  setTypingStats,
  wordList,
  resetTypeRacer,
  isTimerRunning,
  toggleIsTimerRunning,
  timeLimit,
  setIsDone,
}: TypingProps) => {
  const [currentArrWordIndex, setCurrentArrWordIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [rowIndex, setRowIndex] = useState(1);
  const [top, setTop] = useState(0);
  const [prevWord, setPrevWord] = useState<PreviousWordArray>([]);
  const [characters, setCharacters] = useState<Stat>({
    correct: 0,
    incorrect: 0,
    missed: 0,
  });

  const countChars = () => {
    const stat = {
      correct: 0,
      incorrect: 0,
      missed: 0,
    };
    input.split("").forEach((letter, idx) => {
      if (letter === wordList[currentArrWordIndex].at(idx)) {
        stat.correct += 1;
      } else {
        stat.incorrect += 1;
      }
    });
    return stat;
  };

  const snapshotStats = (time: number) => {
    if (time >= timeLimit) {
      setIsDone(true);
      stop();
      return;
    }
    const minFromSec = time / 60;
    const inputStat = countChars();
    const stat = {
      correct: inputStat.correct + characters.correct,
      incorrect: inputStat.incorrect + characters.incorrect,
      missed: inputStat.missed + characters.missed,
    };
    const grossWPM = stat.correct / 5 / minFromSec;
    const acc =
      (stat.correct / (stat.missed + stat.incorrect + stat.correct)) * 100;
    setTypingStats(
      typingStats.concat({
        stat: stat,
        wpm: grossWPM,
        acc: acc,
      })
    );
  };

  const { time, play, stop }: Timer = useTimer(
    timeLimit,
    isTimerRunning,
    snapshotStats
  );

  const ref = useRef<HTMLCollection | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current!.focus();
    }
    setCurrentArrWordIndex(0);
    setCurrentWordIndex(0);
    setInput("");
    setRowIndex(1);
    setPrevWord([]);
    setTop(0);
    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
  }, [wordList]);

  const inputBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    wordList[currentArrWordIndex].split("").forEach((letter, idx) => {
      const currentChildClassList =
        ref.current![currentArrWordIndex].children[idx].classList;
      if (idx > event.target.value.length - 1) {
        currentChildClassList.remove("correct", "incorrect");
      } else if (letter === event.target.value.at(idx)) {
        currentChildClassList.add("correct");
      } else {
        currentChildClassList.add("incorrect");
      }
    });
    play();
    toggleIsTimerRunning(true);
    setInput(event.target.value);
  };
  const switchWordHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " && input.length === 0) {
      event.preventDefault();
      return;
    }
    if (event.key === " " && input.length !== 0) {
      event.preventDefault();
      const currentTop =
        ref.current![currentArrWordIndex].getBoundingClientRect().top;
      const nextTop =
        ref.current![currentArrWordIndex + 1].getBoundingClientRect().top;
      const isCorrect = input === wordList[currentArrWordIndex];
      //TODO FIX THIS SHIT. use a flexbox and delete nodes?????
      if (currentTop !== nextTop) {
        setTop(-(nextTop - currentTop) * rowIndex);
        setRowIndex(rowIndex + 1);
      }
      if (!isCorrect) {
        ref.current![currentArrWordIndex].classList.add("error");
      }
      setCurrentArrWordIndex(currentArrWordIndex + 1);
      setPrevWord(
        prevWord.concat({
          word: input,
          prevIndex: currentWordIndex,
          isCorrect: isCorrect,
        })
      );
      setCharacters({
        correct: isCorrect
          ? characters.correct + input.length + 1
          : characters.correct,
        missed: isCorrect
          ? characters.missed
          : characters.missed +
            Math.abs(wordList[currentArrWordIndex].length - input.length),
        incorrect: isCorrect
          ? characters.incorrect
          : characters.incorrect + input.length,
      });
      setInput("");
      setCurrentWordIndex(0);
      return;
    }
    if (event.key === "Backspace" && input.length === 0) {
      event.preventDefault();
      if (prevWord.length === 0 || prevWord[prevWord.length - 1].isCorrect) {
        return;
      }
      const inputtedWord = prevWord[prevWord.length - 1].word;
      const prevIndex = currentArrWordIndex - 1;
      ref.current![prevIndex].classList.remove("error");
      setCurrentWordIndex(prevWord[prevWord.length - 1].prevIndex);
      setCurrentArrWordIndex(prevIndex);
      setPrevWord(prevWord.slice(0, prevWord.length - 1));
      setInput(inputtedWord);
      setCharacters({
        ...characters,
        missed:
          characters.missed -
          Math.abs(wordList[prevIndex].length - inputtedWord.length),
        incorrect: characters.incorrect - inputtedWord.length,
      });
    }
  };

  const findChildNode = (elem: HTMLDivElement | null) => {
    if (!elem || !elem.children) return;
    if (elem.children.length !== 0) {
      ref.current = elem.children;
    }
  };

  return (
    <div className="content">
      <p>{timeLimit - time}</p>
      <div className="word-container">
        <div
          className="row"
          style={{ top: top }}
          ref={(containterRef) => containterRef && findChildNode(containterRef)}
        >
          <AllWords wordList={wordList} />
        </div>
      </div>
      <input
        value={input}
        onChange={inputBoxHandler}
        onKeyDown={switchWordHandler}
        ref={inputRef}
      />
      <div tabIndex={0} className="flex-container" onClick={resetTypeRacer}>
        <svg
          height="32"
          viewBox="0 0 48 48"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default Typing;
