import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransaction } from "../api/transactionsApi";

export const useAddTransactionMutate = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return mutate;
}