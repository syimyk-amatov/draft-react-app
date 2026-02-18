import { useEffect, useState } from "react";
import "./DocumentTitleCounter.scss";

export const DocumentTitleCounter = () => {
  const [counter, setCounter] = useState(0);

  const onButtonClick = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    document.title = `You clicked: ${counter}`;
  }, [counter]);

  return (
    <div className="document-title-counter">
      <span className="document-title-counter__label">
        Current Count (check tab title):
      </span>
      <div className="document-title-counter__count">{counter}</div>
      <button
        className="document-title-counter__button"
        onClick={onButtonClick}
        type="button"
      >
        Press me
      </button>
    </div>
  );
};
