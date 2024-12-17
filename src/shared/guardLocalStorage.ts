export default function guardLocalStorage(key: string) {
  return typeof window !== "undefined" ? localStorage.getItem(key) : null;
}
