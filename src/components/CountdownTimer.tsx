import { useState, useEffect } from "react";

type Props = { endsAt: string };

export default function CountdownTimer({ endsAt }: Props) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endsAt));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (timeLeft.total <= 0) return <span className="text-limited-drop text-xs font-medium uppercase tracking-wider">Drop Ended</span>;

  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 bg-limited-drop animate-pulse-dot" />
      <span className="text-limited-drop text-xs font-medium font-display tracking-wider uppercase">
        {timeLeft.days > 0 && `${timeLeft.days}d `}{String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

function getTimeLeft(endsAt: string) {
  const total = Math.max(0, new Date(endsAt).getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
