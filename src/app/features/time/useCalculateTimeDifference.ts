export function calculateTimeDifference(timeString: string): {
  startTime: Date;
  targetTime: Date;
  timeDiff: number;
} {
  // 입력 문자열을 시간 객체로 변환
  const [minutes, seconds] = timeString.split(":").map(Number);
  const targetTime = new Date();
  targetTime.setHours(0, minutes, seconds, 0); // 현재 날짜에 입력된 시간 설정

  // 현재 시간 가져오기
  const currentTime = new Date();

  // 두 시간의 차이를 밀리초 단위로 계산 후 초 단위로 변환
  const timeDifferenceInMilliseconds =
    currentTime.getTime() - targetTime.getTime();
  //const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);

  return {
    startTime: currentTime,
    targetTime,
    timeDiff: timeDifferenceInMilliseconds,
  };
}
