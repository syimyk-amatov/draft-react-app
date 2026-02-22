import { useState } from "react";
import { fakeTransactions } from "./Transaction.model";
import { TransactionAnalytics } from "./TransactionAnalytics";

export const TransactionAnalyticsDemo = () => {
  const [color, setColor] = useState("blue");

  const toggleColor = () => {
    setColor((prevColor) => (prevColor === "blue" ? "red" : "blue"));
  };
  return (
    <div>
      <button onClick={toggleColor} style={{ color }}>
        Toggle Color
      </button>
      <TransactionAnalytics transactions={fakeTransactions} />
    </div>
  );
};
