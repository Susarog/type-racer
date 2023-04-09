import React from "react";

import { AllCharacterType } from "../types";
const Result = ({
  characters,
  time,
  resetTypeRacer,
}: {
  characters: AllCharacterType;
  time: number;
  resetTypeRacer: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const minFromSec = time / 60;
  const calculateWPM = () => {
    return Math.round(characters.correct / 5 / minFromSec);
  };

  return (
    <div className="result-container">
      <div>
        <div>{calculateWPM()}WPM</div>
        <div>
          characters:{characters.correct}/{characters.incorrect}/
          {characters.missed}
        </div>
      </div>
      <div>
        <button onClick={resetTypeRacer}>Next test</button>
        <button onClick={resetTypeRacer}>Repeat</button>
      </div>
    </div>
  );
};

export default Result;
