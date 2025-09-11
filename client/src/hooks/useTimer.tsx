import { useEffect, useState } from "react";

interface TimerProps {
  start: number;
  interval?: number;
  end?: number;
}
export function useTimer(props: TimerProps) {
  const { interval, start, end } = props;
  const [time, setTime] = useState(start ?? 60);

  const reset = () => {
    setTime(start);
  };

  useEffect(() => {
    if (time === (end ?? 0)) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, interval ?? 1000);

    return () => clearInterval(timer);
  }, [time]);

  return {
    time,
    timeInMins: `${Math.floor(time / 60)
      .toString()
      .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`,
    resetTime: reset,
  };
}
