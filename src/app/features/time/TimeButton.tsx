import { useGetTimeQuery } from "@/apis/time";
import Button from "@/shared/Button";
import { useEffect, useState } from "react";
import { TARGET_TIME } from "@/shared/constants/key";
import getDateByString from "./getDateByString";

type TimeButtonProps = {
  className?: string;
};

type TimeState = {
  date: Date;
  formattedTime: string;
};

export default function TimeButton({ className }: TimeButtonProps) {
  const [currentTime, setCurrentTime] = useState<TimeState>(() => {
    const initialDate = new Date();
    return {
      date: initialDate,
      formattedTime: initialDate.toLocaleTimeString(),
    };
  });

  const [targetTime, setTartgetTime] = useState<string | null>(
    localStorage.getItem(TARGET_TIME)
  );
  const [timeDiff, setTimeDiff] = useState(
    Number(targetTime) - Number(currentTime)
  );
  const [toggle, setToggle] = useState(false);

  const { data, isError, isLoading, isFetching, isSuccess } = useGetTimeQuery({
    toggle,
  });

  console.log(currentTime, targetTime, timeDiff);
  const buttonText = isLoading || isFetching ? "loading.." : "Start";
  const isExistTargetTime = localStorage.getItem(TARGET_TIME) != null;

  useEffect(() => {
    if (isSuccess) {
      setTartgetTime(String(getDateByString(data.duration).getTime()));
    }
  }, [data, isSuccess]);

  useEffect(() => {}, [targetTime]);

  useEffect(() => {
    if (!isExistTargetTime) return;
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setCurrentTime({
        date: currentDate,
        formattedTime: currentDate.toLocaleTimeString(),
      });
    }, 1000); // 1초마다 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, [isExistTargetTime]);

  // TODO: if(isSuccess) 현재 시간 startTime 초기화 / targetTime 없으면 startTime + duration = targetTime 초기화 / localStorage에  targetTime - startTime 차이 저장
  // TODO: 실시간 차이값 / 처음 차이값 계산해서 로딩레이어 넓이값 조절
  // TODO: 실시간 차이값 1초단위 반올림으로 로딩텍스트값에 싱크
  // TODO: 실시간 차이값 < 0 아래일때 로컬스토리지 전부 삭제후 스토리지 유무로 텍스트 Done 변경
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
