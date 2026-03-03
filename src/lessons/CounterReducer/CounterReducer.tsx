import { useReducer } from "react";
import "./CounterReducer.scss";

type ActionType =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET_STEP"; payload: number };

interface State {
  count: number;
  step: number;
  max: number;
  min: number;
}

const initialState: State = {
  count: 0,
  step: 1,
  max: 10,
  min: 0,
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "INCREMENT": {
      const count = state.count + state.step;
      return count <= state.max ? { ...state, count } : state;
    }
    case "DECREMENT": {
      const count = state.count - state.step;
      return count >= state.min ? { ...state, count } : state;
    }
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return { ...state, count: 0, step: 1 };
    default:
      return state;
  }
};

export const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, max, min } = state;

  return (
    <div className="counter-reducer-container">
      <h3>Extended Counter</h3>

      <div className="counter-display">
        <span className="count-value">{count}</span>
        {count >= max && <span className="status-badge limit-reached">Max Limit Reached</span>}
        {count <= min && <span className="status-badge limit-reached">Min Limit Reached</span>}
      </div>

      <div className="controls-group">
        <button onClick={() => dispatch({ type: "DECREMENT" })} disabled={count <= min} aria-label="Decrease">
          -
        </button>
        <button onClick={() => dispatch({ type: "INCREMENT" })} disabled={count >= max} aria-label="Increase">
          +
        </button>
      </div>

      <div className="settings-panel">
        <div className="step-selector">
          {[1, 5, 10].map((s) => (
            <button
              key={s}
              className={state.step === s ? "active" : ""}
              onClick={() => dispatch({ type: "SET_STEP", payload: s })}
            >
              Step: {s}
            </button>
          ))}
        </div>

        <div className="controls-group">
          <button className="reset-btn" onClick={() => dispatch({ type: "RESET" })}>
            Reset Counter
          </button>
        </div>
      </div>
    </div>
  );
};
