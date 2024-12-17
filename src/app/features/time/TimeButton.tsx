import { useGetTimeQuery } from "@/apis/time";
import Button from "@/shared/Button";
import { useCallback, useEffect, useState } from "react";
import { TARGET_TIME } from "@/shared/constants/key";
import useTargetTimeUpdate from "./hooks/useTargetTimeUpdate";
import formatTimeText from "./formatTimeText";

type TimeButtonProps = {
  className?: string;
};

type TimeObject = {
  minutes: number;
  seconds: number;
};

export default function TimeButton({ className }: TimeButtonProps) {
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
  const [targetTime, setTargetTime] = useState<number | null>(
    Number(localStorage.getItem(TARGET_TIME))
  );
  const [timeDiff, setTimeDiff] = useState<TimeObject>({
    minutes: 0,
    seconds: 0,
  });
  const [toggle, setToggle] = useState(false);
  const [isExistTargetTime, setIsExistTargetTime] = useState<boolean>(
    localStorage.getItem(TARGET_TIME) != null
  );
  const [doneToggle, setDoneToggle] = useState(false);

  const { data, isError, isLoading, isFetching, isSuccess } = useGetTimeQuery({
    toggle,
  });

  const buttonText = isLoading || isFetching ? "loading.." : "Start";

  console.log(currentTime, targetTime, timeDiff, isExistTargetTime);

  const initTimeButtonState = useCallback(() => {
    localStorage.removeItem(TARGET_TIME);
    setTargetTime(null);
    setTimeDiff({ minutes: 0, seconds: 0 });
    setIsExistTargetTime(false);
    setToggle(false);
    setDoneToggle(true);
    setTimeout(() => {
      setDoneToggle(false);
    }, 1000);
  }, []);

  useTargetTimeUpdate({
    isSuccess,
    duration: data?.duration,
    setTargetTime,
    setIsExistTargetTime,
  });

  useEffect(() => {
    if (!isExistTargetTime) return;
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      setCurrentTime(currentTime);

      if (targetTime == null) return;
      let timeDiff = targetTime - currentTime;

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setTimeDiff({ minutes: 0, seconds: 0 });
        initTimeButtonState();
      }

      const minutes = Math.floor(timeDiff / (1000 * 60));
      timeDiff -= minutes * (1000 * 60);
      const seconds = Math.floor(timeDiff / 1000);
      setTimeDiff({ minutes, seconds });

      console.log("interval : " + currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initTimeButtonState, isExistTargetTime, targetTime]);

  // TODO: 실시간 차이값 / 처음 차이값 계산해서 로딩레이어 넓이값 조절
  // TODO: 인터벌 매끄럽지 못하면 애니메이션or더짧게

  return (
    <div className={` ${className}`}>
      {isError && <div>Error.</div>}
      {isExistTargetTime == true && (
        <div>{`${formatTimeText(timeDiff.minutes)}:${formatTimeText(
          timeDiff.seconds
        )}`}</div>
      )}
      {isExistTargetTime == false &&
        (doneToggle ? (
          <div>Done.</div>
        ) : (
          <Button
            text={buttonText}
            handleClickButton={() => setToggle(true)}
            disabled={isLoading || isFetching}
          />
        ))}
    </div>
  );
}
