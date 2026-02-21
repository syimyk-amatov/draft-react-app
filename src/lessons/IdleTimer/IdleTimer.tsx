import { useEffect, useRef, useState } from "react";
import "./IdleTimer.scss";

export const IdleTimer = () => {
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(0);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);

    setSeconds(0);
    setIsActive(true);

    intervalIdRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    timeoutIdRef.current = setTimeout(() => {
      setIsActive(false);
      // Removed clearInterval to keep the timer running after 5 seconds
    }, 5000);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else if (minutes > 0) {
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${secs}s`;
    }
  };

  useEffect(() => {
    startTimer();

    const handleActivity = () => {
      startTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, []);

  return (
    <div className="idle-timer">
      <h2>Idle Timer (Debounce)</h2>
      
      <div className={`status-badge ${isActive ? "active" : "idle"}`}>
        {isActive ? (
          <>
            <span role="img" aria-label="active">🟢</span> User Active
          </>
        ) : (
          <>
            <span role="img" aria-label="idle">🔴</span> No activity for 5+ sec
          </>
        )}
      </div>

      <div className="timer-display">
        {formatTime(seconds)}
      </div>
      <div className="timer-label">Time since last action</div>
    </div>
  );
};
