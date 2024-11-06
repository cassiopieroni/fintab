import { Transaction } from "../../interfaces/transactions/transaction";

export type TransactionResponse = {
  transactions: Transaction[];
  currPage: number;
  totalPages: number;
}

const defaultTransactionsMock: Transaction[] = [
  { id: 1, description: 'Aluguel', amount: -1200 },
  { id: 2, description: 'Salário', amount: 2500 },
  { id: 3, description: 'Mercado', amount: -400 },
]

export const fetchTransactions = async (pageToFetch: number = 1): Promise<TransactionResponse> => {
  const PAGE_SIZE = 2;
  const FIRST_PAGE = 0;
  
  return new Promise((resolve) => {
    setTimeout(() => {      
      const pageIndex = pageToFetch <= 0 ? FIRST_PAGE : (pageToFetch - 1);
      const startIndex = pageIndex * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      const data = defaultTransactionsMock.slice(startIndex, endIndex);

      resolve({
        transactions: data,
        currPage: pageIndex,
        totalPages: Math.ceil(defaultTransactionsMock.length / PAGE_SIZE),
      });
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