import React, { useState, useEffect } from 'react';
const Timer = ({
  time,
  setIsDone,
}: {
  time: number;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isStart, setIsStart] = useState(true);
  const [duration, setDuration] = useState(time);

  useEffect(() => {
    if (!isStart || duration === 0) return;
    const now = Date.now() + duration * 1000;
    const interval = setInterval(() => {
      const secondLeft = Math.round((now - Date.now()) / 1000);
      setDuration(secondLeft);
      if (secondLeft === 0) {
        setIsStart(false);
        setIsDone(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [duration, isStart]);

  return duration != 0 ? <span>{duration}s</span> : null;
};

export default Timer;
