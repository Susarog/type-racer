import { forwardRef, useState, useEffect } from "react";

const Input = forwardRef((props, ref) => {
  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(1);
  useEffect(() => {
    setCurrentWordIndex(0);

    setCharacters({
      correct: 0,
      incorrect: 0,
      missed: 0,
    });
    setRowIndex(1);
  }, []);
  const updateTextBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.at(-1) === " ") {
      return;
    }
    const isCorrect =
      event.target.value ===
      listOfWords[currentWordIndex].word.substring(
        0,
        event.target.value.length
      );
    setListOfWords(
      listOfWords.map((word, i) => {
        if (currentWordIndex === i) {
          return {
            ...word,
            status: isCorrect ? "active" : "incorrect",
          };
        }
        return word;
      })
    );
    toggleIsTimerRunning(true);
    setInput(event.target.value);
  };
  const insertWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " && input.length !== 0) {
      const currentTop =
        ref.current![currentWordIndex].getBoundingClientRect().top;
      const nextTop =
        ref.current![currentWordIndex + 1].getBoundingClientRect().top;
      if (currentTop !== nextTop) {
        setTop(-(nextTop - currentTop) * rowIndex);
        setRowIndex(rowIndex + 1);
      }
      setCurrentWordIndex(currentWordIndex + 1);
      const isCorrect = input === listOfWords[currentWordIndex].word;
      setListOfWords(
        listOfWords.map((word, i) => {
          if (currentWordIndex === i) {
            return {
              ...word,
              inputtedWord: input,
              status: isCorrect ? "correct" : "incorrect",
            };
          }
          if (currentWordIndex + 1 === i) {
            return {
              ...word,
              status: "active",
            };
          }
          return word;
        })
      );

      setCharacters({
        correct: isCorrect
          ? characters.correct + input.length
          : characters.correct,
        missed: isCorrect
          ? characters.missed
          : characters.missed +
            Math.abs(listOfWords[currentWordIndex].word.length - input.length),
        incorrect: isCorrect
          ? characters.incorrect
          : characters.incorrect + input.length,
      });
      setInput("");
    } else if (
      event.key === "Backspace" &&
      input.length === 0 &&
      currentWordIndex !== 0 &&
      listOfWords[currentWordIndex - 1].status === "incorrect"
    ) {
      const prevIndex = currentWordIndex - 1;
      setCurrentWordIndex(prevIndex);
      setListOfWords(
        listOfWords.map((word, i) => {
          if (prevIndex === i) {
            return {
              ...word,
              status: "active",
            };
          }
          if (currentWordIndex === i) {
            return {
              ...word,
              status: "inactive",
            };
          }
          return word;
        })
      );
      setCharacters({
        ...characters,
        missed:
          characters.missed -
          Math.abs(
            listOfWords[prevIndex].word.length -
              listOfWords[prevIndex].inputtedWord.length
          ),
        incorrect:
          characters.incorrect - listOfWords[prevIndex].inputtedWord.length,
      });
      setInput(`${listOfWords[prevIndex].inputtedWord} `);
    }
  };
  return (
    <input
      value={input}
      onChange={updateTextBox}
      onKeyDown={insertWord}
      ref={(input) => input && input.focus()}
    />
  );
});
export default Input;
