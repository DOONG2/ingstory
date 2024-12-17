import { currentTimeType, targetTimeType, TimeObject } from "./../TimeButton";
import { useEffect } from "react";
import { calculateTimeDifference } from "../calculateTimeDifference";

type useTimeBUttonIntervalProps = {
  isExistTargetTime: boolean;
  targetTime: targetTimeType;
  initTimeButtonState: () => void;
  setTimeDiff: (diff: TimeObject) => void;
  setCurrentTime: (currentTime: currentTimeType) => void;
};

export default function useTimeButtonInterval({
  isExistTargetTime,
  targetTime,
  initTimeButtonState,
  setTimeDiff,
  setCurrentTime,
}: useTimeBUttonIntervalProps) {
  useEffect(() => {
    if (!isExistTargetTime) return;
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      setCurrentTime(currentTime);

      if (targetTime == null) return;
      const { minutes, seconds } = calculateTimeDifference({
        currentTime,
        targetTime,
      });

      if (minutes < 0 || seconds < 0) {
        clearInterval(intervalId);
        initTimeButtonState();
        return;
      }

      setTimeDiff({ minutes, seconds });

      console.log("interval : " + currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    initTimeButtonState,
    isExistTargetTime,
    setCurrentTime,
    setTimeDiff,
    targetTime,
  ]);
  return;
}
