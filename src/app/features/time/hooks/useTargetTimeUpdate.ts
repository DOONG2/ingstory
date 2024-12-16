import { useEffect } from "react";
import getDateByString from "../getDateByString";
import { TARGET_TIME } from "@/shared/constants/key";

type TargetTimeUpdateProps = {
  isSuccess: boolean;
  duration: string | undefined;
  setTargetTime: (time: number) => void;
};

export default function useTargetTimeUpdate({
  isSuccess,
  duration,
  setTargetTime,
}: TargetTimeUpdateProps) {
  useEffect(() => {
    if (isSuccess && duration != undefined) {
      const targetTimeDate = getDateByString(duration);
      localStorage.setItem(TARGET_TIME, String(targetTimeDate.getTime()));
    }
  }, [duration, isSuccess, setTargetTime]);

  useEffect(() => {
    // localStorage 변경 감지 이벤트 리스너
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TARGET_TIME) {
        const newValue = event.newValue;
        if (newValue === null) return;
        setTargetTime(Number(newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setTargetTime]);

  return;
  {
  }
}
