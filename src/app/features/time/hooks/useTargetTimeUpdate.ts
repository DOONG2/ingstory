import { useEffect } from "react";
import getDateByString from "../getDateByString";

type TargetTimeUpdateProps = {
  isSuccess: boolean;
  duration: string | undefined;
  setTargetTime: (time: string) => void;
};

export default function useTargetTimeUpdate({
  isSuccess,
  duration,
  setTargetTime,
}: TargetTimeUpdateProps) {
  useEffect(() => {
    if (isSuccess && duration != undefined) {
      const targetTimeDate = getDateByString(duration);
      setTargetTime(String(targetTimeDate.getTime()));
    }
  }, [duration, isSuccess, setTargetTime]);

  return;
  {
  }
}
