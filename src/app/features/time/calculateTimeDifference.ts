export function calculateTimeDifference(targetTime: Date): number {
  // 현재 시간 가져오기
  const currentTime = new Date();

  // 두 시간의 차이를 밀리초 단위로 계산 후 초 단위로 변환
  const timeDifferenceInMilliseconds =
    currentTime.getTime() - targetTime.getTime();
  const timeDifferenceInSeconds = Math.floor(
    timeDifferenceInMilliseconds / 1000
  );

  return timeDifferenceInSeconds;
}
