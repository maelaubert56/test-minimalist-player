export { cn } from "cn";

export function formatTime(timeInSeconds: number) {
  if (!Number.isFinite(timeInSeconds)) {
    return "0:00";
  }

  const totalSeconds = Math.max(0, Math.floor(timeInSeconds));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
