export default function getDateByString(timeString: string) {
  // 입력 문자열을 시간 객체로 변환
  const [minutes, seconds] = timeString.split(":").map(Number);
  const targetTime = new Date();
  targetTime.setHours(0, minutes, seconds, 0); // 현재 날짜에 입력된 시간 설정

  return targetTime;
}
