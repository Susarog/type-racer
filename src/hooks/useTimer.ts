import { useState, useEffect } from "react";

export default function useTimer(
  endTime: number,
  isTimerRunning: boolean,
  callback: (time: number) => void
) {
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0);
  const play = () => {
    setIsStart(true);
  };
  const stop = () => {
    setIsStart(false);
  };
  useEffect(() => {
    if (isStart) {
      callback(time);
    }
  }, [time]);
  useEffect(() => {
    setTime(0);
  }, [isTimerRunning]);
  useEffect(() => {
    let intervalId: number | null = null;
    if (isStart && isTimerRunning) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [endTime, isStart, isTimerRunning]);

  return { time, play, stop };
}
