import { chains } from 'provider';
import React from 'react';
import { NotificationDetail, NotificationHeading } from '.';
import { getBlockchainLink } from '../../../utils';

export const TransactionPending: React.FC<{ summary: string }> = ({
  summary,
}) => {
  return <NotificationHeading>{summary}</NotificationHeading>;
};

export const TransactionOutcome: React.FC<{
  summary: string;
  transactionHash: string;
  chainId: number;
}> = ({ summary, chainId, transactionHash }) => {
  const networkName = chains.find(chain => chain.id === chainId).name;
  return (
    <div>
      <NotificationHeading>{summary}</NotificationHeading>
      <NotificationDetail>
        <a
          href={getBlockchainLink(transactionHash, networkName)}
          target="_blank"
          rel="noreferrer"
        >
          View on Block Explorer
        </a>
      </NotificationDetail>
    </div>
  );
};
