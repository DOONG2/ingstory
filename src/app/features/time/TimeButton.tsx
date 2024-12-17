import { useGetTimeQuery } from "@/apis/time";
import Button from "@/shared/Button";
import { useCallback, useState } from "react";
import { TARGET_TIME } from "@/shared/constants/key";
import useTargetTimeUpdate from "./hooks/useTargetTimeUpdate";
import formatTimeText from "./formatTimeText";
import { calculateTimeDifference } from "./calculateTimeDifference";
import { GET_TIME_QUERY_KEY } from "@/shared/constants/query";
import { queryClient } from "@/shared/ReactQueryProvider";
import useTimeButtonInterval from "./hooks/useTimeButtonInterval";
import { cx } from "@/shared/tailWindCSS";
import useTimeButtonLoadingLayer from "./hooks/useTimeButtonLoadingLayer";

type TimeButtonProps = {
  className?: string;
};

export type currentTimeType = number;
export type targetTimeType = number | null;

export type TimeObject = {
  minutes: number;
  seconds: number;
};

export default function TimeButton({ className }: TimeButtonProps) {
  const [currentTime, setCurrentTime] = useState<currentTimeType>(
    new Date().getTime()
  );
  const [targetTime, setTargetTime] = useState<targetTimeType>(
    Number(localStorage.getItem(TARGET_TIME))
  );
  const [timeDiff, setTimeDiff] = useState<TimeObject>(() => {
    if (targetTime == null || targetTime == 0)
      return { minutes: 0, seconds: 0 };
    const { minutes, seconds } = calculateTimeDifference({
      currentTime,
      targetTime,
    });
    return { minutes, seconds };
  });
  const [buttonToggle, setButtonToggle] = useState(false);
  const [isExistTargetTime, setIsExistTargetTime] = useState<boolean>(
    localStorage.getItem(TARGET_TIME) != null
  );
  const [doneToggle, setDoneToggle] = useState(false);

  const { data, isError, isLoading, isFetching, isSuccess } = useGetTimeQuery({
    toggle: buttonToggle,
  });

  const buttonText = isLoading || isFetching ? "loading.." : "Start";

  const initTimeButtonState = useCallback(() => {
    localStorage.removeItem(TARGET_TIME);
    setTargetTime(null);
    setTimeDiff({ minutes: 0, seconds: 0 });
    setIsExistTargetTime(false);
    setButtonToggle(false);
    setDoneToggle(true);
    queryClient.removeQueries({ queryKey: [GET_TIME_QUERY_KEY] });
    setTimeout(() => {
      setDoneToggle(false);
    }, 1000);
  }, []);

  useTargetTimeUpdate({
    isSuccess,
    duration: data?.duration,
    setTargetTime,
    setIsExistTargetTime,
    setTimeDiff,
  });

  useTimeButtonInterval({
    isExistTargetTime,
    targetTime,
    initTimeButtonState,
    setTimeDiff,
    setCurrentTime,
  });

  const loadingDuration = useTimeButtonLoadingLayer({
    currentTime,
    targetTime,
  });

  return (
    <>
      <div className={` ${className} z-10`}>
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
              className="disabled:hover:bg-bgPrimary"
              text={buttonText}
              handleClickButton={() => setButtonToggle(true)}
              disabled={isLoading || isFetching}
            />
          ))}
      </div>
      {targetTime && targetTime > 0 && (
        <div
          className={cx(
            `absolute top-0 left-0 h-[100%] w-[0] bg-loadingPrimary transition-width`,
            isExistTargetTime ? "animate-increase" : "animate-decrease"
          )}
          style={{ animationDuration: `${loadingDuration}ms` }}
        />
      )}
    </>
  );
}
