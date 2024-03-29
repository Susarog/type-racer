import React from "react";

import { TypingStats } from "../types";
const Result = ({
  typingStats,
  resetTypeRacer,
}: {
  typingStats: TypingStats;
  resetTypeRacer: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const result = typingStats[typingStats.length - 1];
  const stat = result.stat;
  return (
    <div className="content">
      <div className="result-container">
        <div>
          <div>{Math.round(result.wpm * 10) / 10}WPM</div>
          <div>
            characters:{stat.correct}/{stat.incorrect}/{stat.missed}
          </div>
        </div>
        <div>
          <button onClick={resetTypeRacer}>Next test</button>
          <button onClick={resetTypeRacer}>Repeat</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
