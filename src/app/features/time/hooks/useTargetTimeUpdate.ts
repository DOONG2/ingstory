import { useEffect } from "react";
import getDateByString from "../getDateByString";
import { TARGET_TIME } from "@/shared/constants/key";
import { calculateTimeDifference } from "../calculateTimeDifference";
import { TimeObject } from "../TimeButton";
import { MIL_PER_MIN, MIL_PER_SEC } from "@/shared/constants/time";

type TargetTimeUpdateProps = {
  isSuccess: boolean;
  duration: string | undefined;
  setTargetTime: (time: number) => void;
  setIsExistTargetTime: (bool: boolean) => void;
  setTimeDiff: (timeDiff: TimeObject) => void;
};

export default function useTargetTimeUpdate({
  isSuccess,
  duration,
  setTargetTime,
  setIsExistTargetTime,
  setTimeDiff,
}: TargetTimeUpdateProps) {
  useEffect(() => {
    if (isSuccess && duration !== undefined) {
      const targetTimeDate = getDateByString(duration);
      const currentTime = new Date().getTime();
      const targetTime =
        currentTime +
        (targetTimeDate.getMinutes() * MIL_PER_MIN +
          targetTimeDate.getSeconds() * MIL_PER_SEC);

      localStorage.setItem(TARGET_TIME, String(targetTime));
      const { minutes, seconds } = calculateTimeDifference({
        currentTime,
        targetTime,
      });
      setIsExistTargetTime(true);
      setTargetTime(targetTime);
      setTimeDiff({ minutes, seconds });
    }
  }, [duration, isSuccess, setIsExistTargetTime, setTargetTime, setTimeDiff]);
}
