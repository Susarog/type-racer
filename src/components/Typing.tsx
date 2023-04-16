import { useEffect, useState, useRef, memo } from "react";
import { WordInputArray, AllCharacterType } from "../types";

/* eslint-disable react/display-name */
const AllWords = memo(({ wordList }: { wordList: WordInputArray }) => {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
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
  characters: AllCharacterType;
  setCharacters: React.Dispatch<React.SetStateAction<AllCharacterType>>;
  wordList: WordInputArray;
  resetTypeRacer: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
  toggleIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PreviousWord {
  word: string;
  prevIndex: number;
  isCorrect: boolean;
}
type PreviousWordArray = Array<PreviousWord>;

const Typing = ({
  characters,
  setCharacters,
  wordList,
  resetTypeRacer,
  children,
  toggleIsTimerRunning,
}: TypingProps) => {
  const [currentArrWordIndex, setCurrentArrWordIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [rowIndex, setRowIndex] = useState(1);
  const [top, setTop] = useState(0);
  const [prevWord, setPrevWord] = useState<PreviousWordArray>([]);
  const ref = useRef<HTMLCollection | null>(null);
  useEffect(() => {
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
      if (idx > event.target.value.length - 1) {
        ref.current![currentArrWordIndex].children[idx].classList.remove(
          "correct",
          "incorrect"
        );
      } else if (letter === event.target.value.at(idx)) {
        ref.current![currentArrWordIndex].children[idx].classList.add(
          "correct"
        );
      } else {
        ref.current![currentArrWordIndex].children[idx].classList.add(
          "incorrect"
        );
      }
    });
    toggleIsTimerRunning(true);
    setInput(event.target.value);
  };
  const switchWordHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " && input.length === 0) {
      event.preventDefault();
      return;
    }
    //moving to the next word
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
      //TODO change this and put it for each second in the timer!!!
      setCharacters({
        correct: isCorrect
          ? characters.correct + input.length
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
      if (prevWord[prevWord.length - 1].isCorrect) {
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
      <div className="word-container">
        <div
          className="row"
          style={{ top: top }}
          ref={(containterRef) => containterRef && findChildNode(containterRef)}
        >
          <AllWords wordList={wordList} />
        </div>
      </div>
      <div>
        <input
          value={input}
          onChange={inputBoxHandler}
          onKeyDown={switchWordHandler}
          ref={(input) => input && input.focus()}
        />
        <button onClick={resetTypeRacer}>Reset</button>
        {children}
      </div>
    </div>
  );
};

export default Typing;
