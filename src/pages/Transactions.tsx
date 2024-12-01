import React, { useState } from 'react';
import TransactionForm from '../components/transactions/TransactionForm';
import { useTransactionsQuery } from '../hooks/transactions/useTransactionsQuery';
import TransactionList from '../components/transactions/TransactionList';

const App: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);

  const { data, isPending, isFetching, error } = useTransactionsQuery(currPage);

  const handleOnChangePage = (page: number) => {
    const TOTAL_PAGES = data?.totalPages || 0;

    if (page < 1 || page > TOTAL_PAGES) {
      return;
    }

    setCurrPage(page);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mt-md mb-lg text-center">Gerenciador de Transações</h1>

      {!isPending && <TransactionForm />}

      {isPending && <div className="text-md"> Carregando as transações...</div>}

      {error && <div className="text-md text-danger">Ocorreu um erro ao buscar as transações. Por favor, tente novamente.</div>}

      {data && (
        <TransactionList
          transactions={data.transactions}
          onChangePage={handleOnChangePage}
          currPage={currPage}
          isFetchingTransactions={isFetching}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};

export default App;
