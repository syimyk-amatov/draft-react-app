import { useLayoutEffect, useRef, useState } from "react";
import "./Tooltip.scss";

type TooltipProps = {
  text: string;
  targetElement: HTMLElement | null;
};

export const TooltipDemo = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const onMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const onMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="tooltip-demo">
      <h2 className="tooltip-demo__title">Tooltip Demo</h2>
      <p className="tooltip-demo__status">Status: {isTooltipVisible ? "Visible" : "Hidden"}</p>
      <button 
        className="tooltip-demo__button" 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        ref={buttonRef}
      >
        Hover to see a tooltip
      </button>
      
      {isTooltipVisible ? <Tooltip text="I am a tooltip" targetElement={buttonRef.current} /> : null}
    </div>
  );
};

export const Tooltip = ({ text, targetElement }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const minHeight = tooltipRect.height + 8;
    const left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

    let top: number;
    if (targetRect.top - minHeight > 0) {
      top = targetRect.top - minHeight;
    } else {
      top = targetRect.bottom + 8;
    }

    tooltipRef.current.style.left = `${left}px`;
    tooltipRef.current.style.top = `${top}px`;

    tooltipRef.current.style.position = "fixed";
  }, [text, targetElement]);

  return (
    <div className="tooltip" ref={tooltipRef}>
      {text}
    </div>
  );
};
