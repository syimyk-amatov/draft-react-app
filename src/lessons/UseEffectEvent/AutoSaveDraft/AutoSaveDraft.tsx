import React, { useState, useEffect, useEffectEvent } from "react";
import "./AutoSaveDraft.scss";

export const AutoSaveDraft: React.FC = () => {
  const [text, setText] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const saveDraft = useEffectEvent(() => {
    if (!text.trim()) return;

    console.log(`[AutoSave] Saving draft: "${text.substring(0, 15)}..."`);
    const time = new Date().toLocaleTimeString();
    setLastSaved(`Saved at ${time}`);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveDraft();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="autosave-draft">
      <div>{}</div>
      <div className="autosave-draft__header">
        <h2 className="autosave-draft__title">Editor</h2>
        <span className="autosave-draft__status">{lastSaved || "Not saved yet"}</span>
      </div>

      <textarea
        className="autosave-draft__textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your article here... It will automatically save every 5 seconds without resetting the timer while you type."
      />

      <div className="autosave-draft__info">
        <p>
          💡 <b>Tip:</b> Watch the "Saved at ..." indicator. It should update every 5 seconds regardless of how fast you are typing. If the timer
          resets every time you type, the interval is improperly depending on state.
        </p>
      </div>
    </div>
  );
};
