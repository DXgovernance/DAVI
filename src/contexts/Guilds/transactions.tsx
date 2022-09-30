// import useLocalStorage from '../../hooks/Guilds/useLocalStorage';
import {
  TransactionOutcome,
  TransactionPending,
} from 'components/ToastNotifications/TransactionToasts';
import { TransactionModal } from 'components/Web3Modals';
import { Transaction } from '../../types/types.guilds';
import { providers } from 'ethers';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useProvider } from 'wagmi';
import { db } from 'utils';

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: Transaction;
  };
}
interface PendingTransaction {
  summary: string;
  transactionHash: string;
  cancelled: boolean;
  showModal: boolean;
}
interface TransactionsContextInterface {
  transactions: Transaction[];
  pendingTransaction: PendingTransaction;
  createTransaction: (
    summary: string,
    txFunction: () => Promise<providers.TransactionResponse>,
    showModal?: boolean,
    cb?: (error?: any, txtHash?: any) => void
  ) => void;
  clearAllTransactions: () => void;
}

const TransactionsContext = createContext<TransactionsContextInterface>(null);

export const TransactionsProvider = ({ children }) => {
  const { chain } = useNetwork();
  const chainId = useMemo(() => chain?.id, [chain]);
  const { address } = useAccount();

  const transactions = useLiveQuery(async () => {
    try {
      return await db.transactions
        .where({ userAddress: address, chainId: chainId })
        .toArray();
    } catch (e) {
      console.log(e);
      return [];
    }
  });
  const [pendingTransaction, setPendingTransaction] =
    useState<PendingTransaction>(null);

  const addTransaction = (
    txResponse: providers.TransactionResponse,
    summary?: string
  ) => {
    if (!txResponse.hash) return;

    const transaction: Transaction = {
      hash: txResponse.hash,
      from: txResponse.from,
      summary,
      addedTime: Date.now(),
    };

    db.transactions.add({
      ...transaction,
      userAddress: address,
      chainId,
    });
  };

  const clearAllTransactions = () => {
    db.transactions.clear();
  };

  const finalizeTransaction = useCallback(
    (id: number, receipt: providers.TransactionReceipt) => {
      try {
        db.transactions.update(id, {
          receipt: {
            transactionHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber,
            status: receipt.status,
          },
          confirmedTime: Date.now(),
        });
      } catch (e) {
        // handle error
      }
    },
    []
  );

  // Mark the transactions as finalized when they are mined
  const provider = useProvider({ chainId });
  useEffect(() => {
    let isSubscribed = true;

    !!transactions &&
      transactions
        .filter(transaction => !transaction.receipt)
        .forEach(transaction => {
          provider.waitForTransaction(transaction.hash).then(receipt => {
            if (isSubscribed) finalizeTransaction(transaction.id, receipt);
          });
        });

    return () => {
      isSubscribed = false;
    };
  }, [transactions, finalizeTransaction, provider]);

  // Update the pending transaction notifications when finalized
  useEffect(() => {
    !!transactions &&
      transactions.forEach(transaction => {
        if (transaction.receipt && toast.isActive(transaction.hash)) {
          if (transaction.receipt.status === 1) {
            toast.update(transaction.hash, {
              isLoading: false,
              render: (
                <TransactionOutcome
                  summary={transaction.summary}
                  chainId={chainId}
                  transactionHash={transaction.hash}
                />
              ),
              icon: <FiCheckCircle />,
              type: toast.TYPE.SUCCESS,
              autoClose: 15000,
            });
          } else {
            toast.update(transaction.hash, {
              isLoading: false,
              render: (
                <TransactionOutcome
                  summary={transaction.summary}
                  chainId={chainId}
                  transactionHash={transaction.hash}
                />
              ),
              icon: <FiXCircle />,
              type: toast.TYPE.ERROR,
              autoClose: 15000,
            });
          }
        }
      });
  }, [transactions, chainId]);

  // Trigger a new transaction request to the user wallet and track its progress
  const createTransaction = async (
    summary: string,
    txFunction: () => Promise<providers.TransactionResponse>,
    showModal: boolean = true,
    cb: (error?: any, txtHash?: any) => void = null
  ) => {
    setPendingTransaction({
      summary,
      showModal,
      cancelled: false,
      transactionHash: null,
    });
    let transactionHash = null;
    try {
      const txResponse = await txFunction();
      transactionHash = txResponse.hash;
      addTransaction(txResponse, summary);
      setPendingTransaction(pendingTransaction => ({
        ...pendingTransaction,
        transactionHash,
      }));
      toast(<TransactionPending summary={summary} />, {
        toastId: transactionHash,
        autoClose: false,
        isLoading: true,
      });
      if (cb && typeof cb === 'function') cb(null, transactionHash);
    } catch (e) {
      console.error('Transaction execution failed', e);
      setPendingTransaction(pendingTransaction => ({
        ...pendingTransaction,
        cancelled: true,
      }));
      if (cb && typeof cb === 'function') cb(e, null);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        pendingTransaction,
        createTransaction,
        clearAllTransactions,
      }}
    >
      {children}

      <TransactionModal
        message={pendingTransaction?.summary}
        transactionHash={pendingTransaction?.transactionHash}
        onCancel={() => setPendingTransaction(null)}
        txCancelled={pendingTransaction?.cancelled}
      />
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
