import { useMemo, useState } from "react";
import { Transaction, TransactionCategory } from "./Transaction.model";
import "./TransactionAnalytics.scss";

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

interface CategoryGroup {
  category: TransactionCategory;
  totalAmount: number;
  transactions: Transaction[];
}

interface AnalyticsReport {
  highestSpendingCategory: CategoryGroup;
  lowestSpendingCategory: CategoryGroup;
  mostExpensiveTransaction: Transaction;
  cheapestTransaction: Transaction;
  totalTurnover: number;
  totalTransactions: number;
  categoryCount: number;
}

type SortKey = keyof Omit<Transaction, "id">;
type SortOrder = "asc" | "desc";

export const TransactionAnalytics = ({ transactions }: TransactionAnalyticsProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("category");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey): void => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const report = useMemo((): AnalyticsReport => {
    const totalTurnover = transactions.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map<TransactionCategory, CategoryGroup>();

    transactions.forEach((transaction) => {
      if (!categoryMap.has(transaction.category)) {
        categoryMap.set(transaction.category, {
          category: transaction.category,
          totalAmount: 0,
          transactions: [],
        });
      }

      const group = categoryMap.get(transaction.category)!;
      group.totalAmount += transaction.amount;
      group.transactions.push(transaction);
    });

    const categoryGroups = Array.from(categoryMap.values());

    categoryGroups.sort((a, b) => b.totalAmount - a.totalAmount);

    const highestSpendingCategory = categoryGroups[0];
    const lowestSpendingCategory = categoryGroups[categoryGroups.length - 1];

    const mostExpensiveTransaction = transactions.reduce((max, item) => (item.amount > max.amount ? item : max));
    const cheapestTransaction = transactions.reduce((min, item) => (item.amount < min.amount ? item : min));
    const totalTransactions = transactions.length;

    return {
      highestSpendingCategory,
      lowestSpendingCategory,
      totalTurnover,
      totalTransactions,
      mostExpensiveTransaction,
      cheapestTransaction,
      categoryCount: categoryGroups.length,
    };
  }, [transactions]);

  const sortedTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => {
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        return 0;
      })
      .slice(0, 5);
  }, [transactions, sortKey, sortOrder]);

  return (
    <div className="analytics-container">
      <div className="analytics-summary">
        <h3>Analytics Report</h3>
        <p>
          <strong>Total Transactions:</strong> {report.totalTransactions}
        </p>
        <p>
          <strong>Highest Spending Category:</strong> {report.highestSpendingCategory.category} ($
          {report.highestSpendingCategory.totalAmount})
        </p>
        <p>
          <strong>Lowest Spending Category:</strong> {report.lowestSpendingCategory.category} ($
          {report.lowestSpendingCategory.totalAmount})
        </p>
        <p>
          <strong>Most Expensive Transaction:</strong> {report.mostExpensiveTransaction.category} ($
          {report.mostExpensiveTransaction.amount})
        </p>
        <p>
          <strong>Cheapest Transaction:</strong> {report.cheapestTransaction.category} ($
          {report.cheapestTransaction.amount})
        </p>
      </div>

      <table className="analytics-table">
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
              Category {sortKey === "category" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
              Amount {sortKey === "amount" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>
              Date {sortKey === "createdAt" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(({ id, category, amount, createdAt }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{category}</td>
              <td>${amount}</td>
              <td>
                {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>${report.totalTurnover}</strong>
            </td>
            <td>({report.categoryCount} Categories)</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
