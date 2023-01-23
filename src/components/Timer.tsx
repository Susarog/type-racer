import React, { useState, useEffect } from 'react';
const Timer = ({
  timeInSec,
  setIsTypingValid,
}: {
  timeInSec: number;
  setIsTypingValid: any;
}) => {
  const [time, setTime] = useState(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    if (!isActive) {
      setTime(30);
      const temp = setInterval(() => {
        console.log(time);
        if (time > 0) {
          setTime((prev) => prev - 1);
        } else {
          clearInterval(temp);
        }
      }, 1000);
      return () => {
        clearInterval(temp);
      };
    }
  }, [isActive]);

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>test</button>
      {time}s
    </>
  );
};

export default Timer;
