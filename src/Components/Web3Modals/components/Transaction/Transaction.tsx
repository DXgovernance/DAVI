import { useWeb3React } from '@web3-react/core';
import { FiArrowUpRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { getChains } from 'provider/connectors';
import { Transaction as TransactionInterface } from 'types/types.guilds';
import { getBlockchainLink } from 'utils';
import PendingCircle from 'old-components/common/PendingCircle';

import { TransactionContainer, Link, Icon } from './Transaction.styled';

interface TransactionProps {
  transaction: TransactionInterface;
}

export const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { chainId } = useWeb3React();
  const networkName = getChains().find(chain => chain.id === chainId).name;
  return (
    <TransactionContainer>
      <Link
        href={getBlockchainLink(transaction.hash, networkName)}
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
