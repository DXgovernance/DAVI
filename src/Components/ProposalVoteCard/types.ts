import { BigNumber } from 'ethers';
import type { VoteData } from 'hooks/Guilds/ether-swr/guild/useVotingResults';
import { ERC20Guild } from 'types/contracts';
import { ProposalMetadata } from 'types/types.guilds';
import { Moment } from 'moment';
import { providers } from 'ethers';

export interface VoteConfirmationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  selectedAction?: string;
  onConfirm: () => void;
  votingPower?: number;
  totalLocked?: number;
}

export interface Voter {
  avatar: string;
}

export interface hasVotingPowerProps {
  hasNoVotingPower: boolean;
  hasVotingPowerAtCurrentSnapshot: boolean;
}

interface VotingPower {
  percent: number;
  userVotingPower: BigNumber;
  atSnapshot: BigNumber;
  atCurrentSnapshot: BigNumber;
}

interface Proposal {
  id: string;
  metadata: ProposalMetadata;
  endTime: Moment;
}

export interface ProposalVoteCardProps {
  voteData: VoteData;
  proposal: Proposal;
  timestamp: number;
  votingPower: VotingPower;
  currentLockedPercent: number;
  contract: ERC20Guild;
  createTransaction: (
    summary: string,
    txFunction: () => Promise<providers.TransactionResponse>
  ) => void;
}
