import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchTransactions, TransactionResponse } from "../../api/transactions/transactionsApi";

export const useTransactionsQuery = (currPage: number = 1) => {
  const query = useQuery<TransactionResponse>({
    queryKey: ['transactions', currPage],
    queryFn: () => fetchTransactions(currPage),
    placeholderData: keepPreviousData,
  });

  return query;
}