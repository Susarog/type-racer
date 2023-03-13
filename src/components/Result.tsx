import React from 'react';

const Result = ({
  setIsDone,
  resetTypeRacer,
}: {
  setIsDone: any;
  resetTypeRacer: any;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <button onClick={resetTypeRacer}>reset</button>
        <button onClick={resetTypeRacer}> next test</button>
        <button>repeat</button>
      </div>
    </div>
  );
};

export default Result;
