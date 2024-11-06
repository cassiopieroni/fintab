import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTransaction } from "../../api/transactions/transactionsApi";

export const useDeleteTransactionMutate = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: removeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return mutate;
}