import { FiArrowUpRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Transaction as TransactionInterface } from 'types/types.guilds';
import PendingCircle from 'components/Primitives/PendingCircle';
import { TransactionContainer, Link, Icon } from './Transaction.styled';
import { getBlockExplorerUrl } from 'provider';
import { useNetwork } from 'wagmi';

interface TransactionProps {
  transaction: TransactionInterface;
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { chain } = useNetwork();

  return (
    <TransactionContainer>
      <Link
        href={getBlockExplorerUrl(chain, transaction.hash, 'address')}
        target="_blank"
      >
        {transaction.summary} <FiArrowUpRight />
      </Link>
      <Icon>
        {!transaction.receipt ? (
          <PendingCircle height="16px" width="16px" color="#000" />
        ) : transaction.receipt?.status === 1 ? (
          <FiCheckCircle />
        ) : (
          <FiXCircle />
        )}
      </Icon>
    </TransactionContainer>
  );
};
