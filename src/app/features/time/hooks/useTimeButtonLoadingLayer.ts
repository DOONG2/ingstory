import { useEffect, useState } from "react";
import { calculateTimeDifference } from "../calculateTimeDifference";
import { currentTimeType, targetTimeType } from "../TimeButton";
import { MIL_PER_MIN, MIL_PER_SEC } from "@/shared/constants/time";

type useTimeButtonLoadingLayerProps = {
  targetTime: targetTimeType;
  currentTime: currentTimeType;
};

export default function useTimeButtonLoadingLayer({
  currentTime,
  targetTime,
}: useTimeButtonLoadingLayerProps) {
  const [loadingDuration, setLoadingDuration] = useState(0);

  useEffect(() => {
    if (targetTime === null || targetTime === 0) return;
    const { seconds, minutes } = calculateTimeDifference({
      currentTime,
      targetTime,
    });
    const timeDiff = seconds * MIL_PER_SEC + minutes * MIL_PER_MIN;
    setLoadingDuration(timeDiff);
  }, [targetTime]);
  return loadingDuration;
}
