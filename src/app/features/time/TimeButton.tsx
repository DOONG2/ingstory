import { useGetTimeQuery } from "@/apis/time";
import Button from "@/shared/Button";
import { useEffect, useState } from "react";
import { TARGET_TIME } from "@/shared/constants/key";
import useTargetTimeUpdate from "./hooks/useTargetTimeUpdate";

type TimeButtonProps = {
  className?: string;
};

export default function TimeButton({ className }: TimeButtonProps) {
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
  const [targetTime, setTargetTime] = useState<number | null>(
    Number(localStorage.getItem(TARGET_TIME))
  );
  const [timeDiff, setTimeDiff] = useState<number | null>(
    targetTime ? targetTime - currentTime : null
  );
  const [toggle, setToggle] = useState(false);

  const { data, isError, isLoading, isFetching, isSuccess } = useGetTimeQuery({
    toggle,
  });

  const buttonText = isLoading || isFetching ? "loading.." : "Start";
  const isExistTargetTime = localStorage.getItem(TARGET_TIME) != null;

  useTargetTimeUpdate({ isSuccess, duration: data?.duration, setTargetTime });

  useEffect(() => {
    if (!isExistTargetTime) return;
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      setCurrentTime(currentTime);
      if (targetTime != null) setTimeDiff(targetTime - currentTime);
    }, 1000);

    console.log(currentTime, targetTime, timeDiff);

    return () => clearInterval(intervalId);
  }, [currentTime, isExistTargetTime, targetTime, timeDiff]);

  useEffect(() => {}, [targetTime]);

  // TODO: diff 음수일때 로컬스토리지 삭제, 상태 init, Done 변경
  // TODO: 실시간 차이값 / 처음 차이값 계산해서 로딩레이어 넓이값 조절
  // TODO: 실시간 차이값 1초단위 반올림으로 로딩텍스트값에 싱크
  // TODO: Done 텍스트 보이게 1초 지연후 Start 버튼 렌더
  // TODO: 전체 인터벌 1초 / 로딩 ui 남은시간 따로 인터벌
  // TODO: 인터벌 매끄럽지 못하면 애니메이션or더짧게

  return (
    <div className={` ${className}`}>
      {isError && <div>Error.</div>}
      {isExistTargetTime == true && <div>{timeDiff}</div>}
      {isExistTargetTime == false && (
        <Button
          text={buttonText}
          handleClickButton={() => setToggle(true)}
          disabled={isLoading || isFetching}
        />
      )}

      {/* <div>Done.</div> */}
    </div>
  );
}
