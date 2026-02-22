export enum TransactionCategory {
  Food = "Food",
  Ticket = "Ticket",
  Tax = "Tax",
  Service = "Service",
}

export interface Transaction {
  id: number;
  amount: number;
  category: TransactionCategory;
  createdAt: Date;
}

let transactionIdCounter = 1;
export const generateFakeTransactions = (count: number): Transaction[] => {
  const categories = Object.values(TransactionCategory);
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: transactionIdCounter++,
      amount: parseFloat((Math.random() * 100).toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    });
  }

  return transactions;
};

export const fakeTransactions = generateFakeTransactions(1000);
