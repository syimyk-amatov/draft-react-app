import { fakeTransactions } from "./Transaction.model";
import { TransactionAnalytics } from "./TransactionAnalytics";
import { useTheme } from "../theme/ThemeContext";

export const TransactionAnalyticsDemo = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "24px" }}>
      <button 
        onClick={toggleTheme} 
        style={{
          padding: "8px 16px",
          marginBottom: "16px",
          cursor: "pointer",
          backgroundColor: theme === "light" ? "#333" : "#eee",
          color: theme === "light" ? "#fff" : "#333",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Current Theme: {theme.toUpperCase()} (Click to Toggle)
      </button>
      <TransactionAnalytics transactions={fakeTransactions} />
    </div>
  );
};
