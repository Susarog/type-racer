import React, { useState, useEffect } from 'react';
const TIME_IN_MILISECONDS_TO_COUNTDOWN = 30 * 1000;
const INTERVAL_IN_MILISECONDS = 100;

const Timer = ({
  timeInSec,
  setIsTypingValid,
}: {
  timeInSec: number;
  setIsTypingValid: any;
}) => {
  const [time, setTime] = useState(TIME_IN_MILISECONDS_TO_COUNTDOWN);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    if (isActive) {
      const countDownUntilZero = () => {
        setTime((prevTime) => {
          if (prevTime <= 0) return 0;

          const now = Date.now();
          const interval = now - referenceTime;
          setReferenceTime(now);
          return prevTime - interval;
        });
      };
      setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
    }
  }, [isActive]);

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>test</button>
      {Math.floor(time / 1000)}s
    </>
  );
};

export default Timer;
