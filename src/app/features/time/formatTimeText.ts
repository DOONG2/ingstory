export default function formatTimeText(time: number) {
  return String(time).padStart(2, "0");
}
