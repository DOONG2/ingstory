import { useEffect, useState } from "react";
import { calculateTimeDifference } from "../calculateTimeDifference";
import { currentTimeType, targetTimeType } from "../TimeButton";

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
    const { timeDiff } = calculateTimeDifference({ currentTime, targetTime });
    setLoadingDuration(timeDiff);
  }, [targetTime]);
  return loadingDuration;
}
