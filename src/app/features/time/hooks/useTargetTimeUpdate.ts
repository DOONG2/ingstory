import { useEffect } from "react";
import getDateByString from "../getDateByString";
import { TARGET_TIME } from "@/shared/constants/key";

type TargetTimeUpdateProps = {
  isSuccess: boolean;
  duration: string | undefined;
  setTargetTime: (time: number) => void;
  setIsExistTargetTime: (bool: boolean) => void;
};

export default function useTargetTimeUpdate({
  isSuccess,
  duration,
  setTargetTime,
  setIsExistTargetTime,
}: TargetTimeUpdateProps) {
  useEffect(() => {
    if (isSuccess && duration != undefined) {
      const targetTimeDate = getDateByString(duration);
      const targetTime =
        new Date().getTime() +
        +(
          targetTimeDate.getMinutes() * 1000 * 60 +
          targetTimeDate.getSeconds() * 1000
        );
      localStorage.setItem(TARGET_TIME, String(targetTime));
      setIsExistTargetTime(true);
      setTargetTime(targetTime);
    }
  }, [duration, isSuccess, setIsExistTargetTime, setTargetTime]);

  // useEffect(() => {
  //   // localStorage 변경 감지 이벤트 리스너
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (event.key === TARGET_TIME) {
  //       const newValue = event.newValue;
  //       console.log("이벤트:" + newValue);
  //       if (newValue === null) setIsExistTargetTime(false);
  //       else setTargetTime(Number(newValue));
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [setIsExistTargetTime, setTargetTime]);
}
