import { useEffect, useState, useRef } from "react";
import { WordInputArray, AllCharacterType } from "../types";

const AllWords = ({ listOfWords }: { listOfWords: WordInputArray }) => {
  return (
    <>
      {listOfWords.map((word, i) => {
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
};

interface TypingProps {
  characters: AllCharacterType;
  setCharacters: React.Dispatch<React.SetStateAction<AllCharacterType>>;
  listOfWords: WordInputArray;
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
  listOfWords,
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
  }, [listOfWords]);

  const updateTextBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.at(-1) === " ") {
      return;
    }
    toggleIsTimerRunning(true);
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " && input.length === 0) {
      return;
    }
    if (event.key === " " && input.length !== 0) {
      const currentTop =
        ref.current![currentArrWordIndex].getBoundingClientRect().top;
      const nextTop =
        ref.current![currentArrWordIndex + 1].getBoundingClientRect().top;
      const isCorrect = input === listOfWords[currentArrWordIndex];
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
          ? characters.correct + input.length
          : characters.correct,
        missed: isCorrect
          ? characters.missed
          : characters.missed +
            Math.abs(listOfWords[currentArrWordIndex].length - input.length),
        incorrect: isCorrect
          ? characters.incorrect
          : characters.incorrect + input.length,
      });
      setInput("");
      setCurrentWordIndex(0);
    } else if (event.key === "Backspace" && input.length === 0) {
      if (prevWord.length === 0 || prevWord[prevWord.length - 1].isCorrect) {
        return;
      }
      const inputtedWord = prevWord[prevWord.length - 1].word;
      const prevIndex = currentArrWordIndex - 1;
      ref.current![prevIndex].classList.remove("error");
      setCurrentWordIndex(prevWord[prevWord.length - 1].prevIndex);
      setCurrentArrWordIndex(prevIndex);
      setPrevWord(prevWord.slice(0, prevWord.length - 1));
      setCharacters({
        ...characters,
        missed:
          characters.missed -
          Math.abs(listOfWords[prevIndex].length - inputtedWord.length),
        incorrect: characters.incorrect - inputtedWord.length,
      });
      setInput(`${inputtedWord} `);
    } else if (event.key === "Backspace") {
      setCurrentWordIndex((idx) => idx - 1);
      console.log(currentWordIndex);
      if (currentWordIndex > listOfWords[currentArrWordIndex].length) {
        return;
      }
      ref.current![currentArrWordIndex].children[
        currentWordIndex - 1
      ].classList.remove("correct", "incorrect");
    } else {
      setCurrentWordIndex((idx) => idx + 1);
      if (currentWordIndex > listOfWords[currentArrWordIndex].length - 1) {
        return;
      }
      if (listOfWords[currentArrWordIndex].at(currentWordIndex) === event.key) {
        ref.current![currentArrWordIndex].children[
          currentWordIndex
        ].classList.add("correct");
      } else {
        ref.current![currentArrWordIndex].children[
          currentWordIndex
        ].classList.add("incorrect");
      }
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
          <AllWords listOfWords={listOfWords} />
        </div>
      </div>
      <div>
        <input
          value={input}
          onChange={updateTextBox}
          onKeyDown={insertWord}
          ref={(input) => input && input.focus()}
        />
        <button onClick={resetTypeRacer}>Reset</button>
        {children}
      </div>
    </div>
  );
};

export default Typing;
