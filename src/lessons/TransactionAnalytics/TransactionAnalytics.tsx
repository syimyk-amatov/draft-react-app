import { useCallback, useMemo, useState } from "react";
import { Transaction, TransactionCategory } from "./Transaction.model";

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}
interface TransactionsByCategory {
  transactions: Transaction[];
  categoryAmount: number;
  category: TransactionCategory;
}
interface TransactionStats {
  maxAmountByCategory: TransactionsByCategory;
  minAmountByCategory: TransactionsByCategory;
  maxTransaction: Transaction;
  minTransaction: Transaction;
  totalAmount: number;
  categiesCount: number;
}

type SortKey = keyof Omit<Transaction, "id">;
type SortDesc = "asc" | "desc";

export const TransactionAnalytics = ({ transactions }: TransactionAnalyticsProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("category");
  const [sortDesc, setSortDesc] = useState<SortDesc>("asc");

  const toggleSortKey = (key: SortKey): void => {
    if (sortKey === key) {
      setSortDesc(sortDesc === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDesc("asc");
    }
  };
  const calculateStats = useCallback((): TransactionStats => {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    console.log("calculateStats");
    const categoriesMap = new Map<TransactionCategory, TransactionsByCategory>();
    transactions.forEach((item) => {
      if (categoriesMap.has(item.category)) {
        const transactionByCategory = categoriesMap.get(item.category);
        transactionByCategory!.categoryAmount += item.amount;
        transactionByCategory?.transactions.push(item);
      } else {
        const newTransactionByCategory: TransactionsByCategory = {
          category: item.category,
          categoryAmount: item.amount,
          transactions: [item],
        };
        categoriesMap.set(item.category, newTransactionByCategory);
      }
    });
    const transactionsStats: TransactionsByCategory[] = Array.from(categoriesMap.values());
    transactionsStats.sort((a, b) => b.categoryAmount - a.categoryAmount);

    const maxAmountByCategory = transactionsStats[0];
    const minAmountByCategory = transactionsStats[transactionsStats.length - 1];

    return {
      maxAmountByCategory,
      minAmountByCategory,
      totalAmount,
      maxTransaction: transactions.reduce((max, item) => (item.amount > max.amount ? item : max)),
      minTransaction: transactions.reduce((min, item) => (item.amount < min.amount ? item : min)),
      categiesCount: transactionsStats.length,
    };
  }, [transactions]);
  const stats = useMemo(() => calculateStats(), [calculateStats]);
  const sortTransactions = (key: SortKey, sortDesc: SortDesc) => {
    return [...transactions].sort((a, b) => {
      if (sortDesc === "asc") return a[key] > b[key] ? 1 : -1;
      return a[key] > b[key] ? -1 : 1;
    });
  };
  const sortedTransactions = sortTransactions(sortKey, sortDesc).slice(0, 5);

  return (
    <div>
      <div>
        <div>
          Max amount by category: {stats.maxAmountByCategory.category} - {stats.maxAmountByCategory.categoryAmount}
        </div>
        <div>
          Min amount by category: {stats.minAmountByCategory.category} - {stats.minAmountByCategory.categoryAmount}
        </div>
        <div>
          Max transaction: {stats.maxTransaction.category} - {stats.maxTransaction.amount}
        </div>
        <div>
          Min transaction: {stats.minTransaction.category} - {stats.minTransaction.amount}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>
              <span onClick={() => toggleSortKey("category")}>Category</span>
            </th>
            <th>
              <span onClick={() => toggleSortKey("amount")}>Amount</span>
            </th>
            <th>
              <span onClick={() => toggleSortKey("createdAt")}>Date</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(({ id, category, amount, createdAt }, index) => (
            <tr key={id}>
              <td>{index}</td>
              <td>{category}</td>
              <td>{amount}</td>
              <td>{createdAt.toISOString()}</td>
            </tr>
          ))}
        </tbody>

        <tbody>
          <tr>
            <td>{sortedTransactions.length}</td>
            <td>{stats.categiesCount}</td>
            <td>{stats.totalAmount}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
