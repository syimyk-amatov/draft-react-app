import React, { useState, useEffect, useEffectEvent } from "react";
import "./AnalyticsChat.scss";

function createConnection(roomId: string) {
  return {
    connect: () => {
      console.log(`[Chat connection] Connecting to room ${roomId}...`);
    },
    disconnect: () => {
      console.log(`[Chat connection] Disconnected from room ${roomId}`);
    },
  };
}

export const AnalyticsChat: React.FC = () => {
  const [roomId, setRoomId] = useState("react-help");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [logs, setLogs] = useState<string[]>([]);

  const onConnected = useEffectEvent((room: string) => {
    const message = `[Analytics] User joined ${room} with theme ${theme}`;
    setLogs((prev) => [...prev, message]);
    console.log(message);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    const timer = setTimeout(() => {
      onConnected(roomId);
    }, 1000);

    return () => {
      clearTimeout(timer);
      connection.disconnect();
    };
  }, [roomId]);

  return (
    <div className={`analytics-chat analytics-chat--${theme}`}>
      <div className="analytics-chat__header">
        <h2 className="analytics-chat__title">Chat Room: {roomId}</h2>

        <div className="analytics-chat__controls">
          <select className="analytics-chat__select" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="react-help">react-help</option>
            <option value="node-backend">node-backend</option>
            <option value="random">random</option>
          </select>

          <button className="analytics-chat__theme-btn" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
            Toggle Theme ({theme})
          </button>
        </div>
      </div>

      <div className="analytics-chat__logs">
        <h3 className="analytics-chat__logs-title">Connection Logs</h3>
        <ul className="analytics-chat__logs-list">
          {logs.map((log, index) => (
            <li key={index} className="analytics-chat__logs-item">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
