import React from "react";
import "./Switcher.scss";

interface SwitcherProps {
  isChecked: boolean;
  onChange: () => void;
  labelLeft?: string;
  labelRight?: string;
}

export const Switcher: React.FC<SwitcherProps> = ({ isChecked, onChange, labelLeft, labelRight }) => {
  return (
    <div className="switcher-container" onClick={onChange}>
       {labelLeft && <span className={`switcher-label ${!isChecked ? 'active' : ''}`}>{labelLeft}</span>}
      <div className={`switcher-toggle ${isChecked ? "checked" : ""}`}>
        <div className="switcher-circle" />
      </div>
      {labelRight && <span className={`switcher-label ${isChecked ? 'active' : ''}`}>{labelRight}</span>}
    </div>
  );
};
