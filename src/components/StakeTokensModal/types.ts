import { BigNumber, providers } from 'ethers';
import { ERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { ERC20, ERC20Guild } from 'types/contracts';
import { GuildConfigProps } from 'hooks/Guilds/guild/useGuildConfig';
import React from 'react';
export interface StakeTokensModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  token?: ERC20Info;
  children?: React.ReactElement;
}

export interface StakeTokensFormsProps {
  token: Token;
  userVotingPower: BigNumber;
  guild: Guild;
  createTransaction: (
    summary: string,
    txFunction: () => Promise<providers.TransactionResponse>
  ) => void;
  isRepGuild: boolean;
}
interface Guild {
  contract: ERC20Guild;
  config: GuildConfigProps;
  totalLocked: BigNumber;
}
export interface Token {
  name: string;
  allowance: BigNumber;
  balance: BigNumber;
  info: ERC20Info;
  contract: ERC20;
}

export interface BalanceWidgetWrapperProps {
  token: Token;
  stakeAmount: BigNumber;
  setStakeAmount: (amount: BigNumber) => void;
  roundedBalance: number;
}

export interface StakeTokenButtonProps {
  isRepGuild: boolean;
  stakeAmount: BigNumber;
  token: Token;
  guild: Guild;
  isStakeAmountValid: boolean;
  createTransaction: (
    summary: string,
    txFunction: () => Promise<providers.TransactionResponse>
  ) => void;
}

export interface BalanceInfoLineProps {
  token: Token;
  roundedBalance: number;
}

export interface LockTimeInfoLineProps {
  guild: Guild;
}

export interface VotingPowerInfoLineProps {
  isStakeAmountValid: boolean;
  userVotingPower: BigNumber;
  guild: Guild;
  stakeAmount: BigNumber;
}

export interface UnlockDateInfoLineProps {
  guild: Guild;
  isStakeAmountValid: boolean;
  isRepGuild: boolean;
}
