type calculateTimeDifferenceProps = {
  currentTime: number;
  targetTime: number;
};

export function calculateTimeDifference({
  currentTime,
  targetTime,
}: calculateTimeDifferenceProps): {
  minutes: number;
  seconds: number;
  timeDiff: number;
} {
  let timeDiff = targetTime - currentTime;

  const minutes = Math.floor(timeDiff / (1000 * 60));
  timeDiff -= minutes * (1000 * 60);
  const seconds = Math.floor(timeDiff / 1000);

  return { minutes, seconds, timeDiff };
}
