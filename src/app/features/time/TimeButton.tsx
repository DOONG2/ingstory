import { useGetTimeQuery } from "@/apis/time";
import Button from "@/shared/Button";
import { useEffect, useState } from "react";
import { calculateTimeDifference } from "./useCalculateTimeDifference";
import { START_TIME, TARGET_TIME, TIME_DIFF } from "@/shared/constants/key";

type TimeButtonProps = {
  className?: string;
};

export default function TimeButton({ className }: TimeButtonProps) {
  const [count, setCount] = useState();
  const [toggle, setToggle] = useState(false);

  const { data, isError } = useGetTimeQuery({ toggle });

  console.log(isError);

  const { startTime, targetTime, timeDiff } = calculateTimeDifference("01:00");
  console.log(startTime, targetTime, timeDiff);

  // TODO: if(isSuccess) 현재 시간 startTime 초기화 / targetTime 없으면 startTime + duration = targetTime 초기화 / localStorage에  targetTime - startTime 차이 저장
  // TODO: 실시간 차이값 / 처음 차이값 계산해서 로딩레이어 넓이값 조절
  // TODO: 실시간 차이값 1초단위 반올림으로 로딩텍스트값에 싱크
  // TODO: 실시간 차이값 < 0 아래일때 로컬스토리지 전부 삭제후 스토리지 유무로 텍스트 Done 변경
  // TODO: Done 텍스트 보이게 1초 지연후 Start 버튼 렌더
  // TODO: 인터벌 1초 / 로딩 ui 남은시간 따로
  // TODO: 인터벌 1초로 로딩화면 매끄럽지 못하면 애니메이션or더짧게

  return (
    <div className={` ${className}`}>
      <Button text={"Start"} handleClickButton={() => setToggle(true)} />
      {/* <div>Done.</div> */}
    </div>
  );
}
