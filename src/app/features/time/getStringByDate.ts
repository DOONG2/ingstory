export default function getStringByDate(date: Date) {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
