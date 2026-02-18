import { useEffect, useState } from "react";

export const IdleTimer = () => {
  const [isActive, setIsActive] = useState(true);
  const [lastActiveTime, setLastActiveTime] = useState(0);
  let timerId: any;

  useEffect(() => {
    window.addEventListener("mousemove", () => {
      console.log("Mouse moved");
      if (!isActive && timerId) {
        clearInterval(timerId);
        setIsActive(true);
      }
    });
  });

  useEffect(() => {
    setLastActiveTime(0);
    timerId = setInterval(() => {
      setLastActiveTime((prevTime) => prevTime + 1);
      if (lastActiveTime >= 5) {
        setIsActive(false);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [isActive]);

  return <div className="idle-timer">{isActive ? <span>User is active</span> : <span>Last active: {lastActiveTime} seconds ago</span>}</div>;
};
