import { MIL_PER_MIN, MIL_PER_SEC } from "@/shared/constants/time";

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
} {
  let timeTemp = targetTime - currentTime;

  const minutes = Math.floor(timeTemp / MIL_PER_MIN);
  const disCountMinutes = minutes * MIL_PER_MIN;
  timeTemp -= disCountMinutes;
  const seconds = Math.floor(timeTemp / MIL_PER_SEC);

  return {
    minutes,
    seconds,
  };
}
