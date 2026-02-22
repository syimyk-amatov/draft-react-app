import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { fakeTransactions, Transaction, TransactionCategory } from "./Transaction.model";

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}
interface TransactionsByCategory {
  transactions: Transaction[];
  totalAmount: number;
  category: TransactionCategory;
}
interface TransactionStats {
  maxAmountByCategory: TransactionsByCategory;
  totalAmount: number;
}

type SortKey = keyof Omit<Transaction, "id">;
type SortDesc = "asc" | "desc";

export const TransactionAnalytics = ({ transactions = fakeTransactions }: TransactionAnalyticsProps) => {
  const { theme } = useTheme();
  const [sortKey, setSortKey] = useState<SortKey>("category");
  const [sortDesc, setSortDesc] = useState<SortDesc>("asc");

  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const calculateStats = () => {
    const categoriesMap = new Map<TransactionCategory, TransactionsByCategory>();
    transactions.forEach((item) => {
      if (categoriesMap.has(item.category)) {
        const transactionByCategory = categoriesMap.get(item.category);
        transactionByCategory!.totalAmount += item.amount;
        transactionByCategory?.transactions.push(item);
      } else {
        const newTransactionByCategory = {
          category: item.category,
          totalAmount: item.amount,
          transactions: [item],
        };
        categoriesMap.set(item.category, newTransactionByCategory);
      }
    });
    const transactionsStats: TransactionsByCategory[] = Array.from(categoriesMap.values());
    const maxAmountByCategory = transactionsStats.reduce((prev, curr) => {
      if (!prev) return curr;
      return prev.totalAmount > curr.totalAmount ? prev : curr;
    });
  };
  const sortTransactions = (key: SortKey, sortDesc: SortDesc) => {
    return [...transactions].sort((a, b) => {
      if (sortDesc === "asc") return a[key] > b[key] ? 1 : -1;
      return a[key] > b[key] ? -1 : 1;
    });
  };
  const sortedTransactions = sortTransactions(sortKey, sortDesc);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(({ id, category, amount }, index) => (
            <tr key={id}>
              <td>{index}</td>
              <td>{category}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
