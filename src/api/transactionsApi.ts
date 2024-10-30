export type Transaction = {
  id: number;
  description: string;
  amount: number;
};

const defaultTransactionsMock: Transaction[] = [
  { id: 1, description: 'Aluguel', amount: -1200 },
  { id: 2, description: 'Salário', amount: 2500 },
  { id: 3, description: 'Mercado', amount: -400 },
]

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(defaultTransactionsMock);
    }, 1000);
  });
};

export const addTransaction = async (newTransaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const addedTransaction: Transaction = {
        id: defaultTransactionsMock.length + 1,
        ...newTransaction,
      };

      defaultTransactionsMock.push(addedTransaction);

      resolve(addedTransaction);
    }, 1000);
  });
};

export const removeTransaction = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = defaultTransactionsMock.findIndex((transaction) => transaction.id === id);
      if (index !== -1) {
        defaultTransactionsMock.splice(index, 1);
      }
      resolve();
    }, 1000);
  });
};