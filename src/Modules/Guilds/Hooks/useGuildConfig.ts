import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useContractReads } from 'wagmi';
import { useVotingPowerForProposalExecution } from 'Modules/Guilds/Hooks/useVotingPowerForProposalExecution';

export type GuildConfigProps = {
  permissionRegistry: string;
  name: string;
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  maxActiveProposals: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  tokenVault: string;
  lockTime: BigNumber;
  voteGas: BigNumber;
  maxGasPrice: BigNumber;
  votingPowerPercentageForProposalExecution: BigNumber;
  votingPowerPercentageForProposalCreation: BigNumber;
  minimumMembersForProposalCreation: BigNumber;
  minimumTokensLockedForProposalCreation: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  token: string;
};

const GETTER_FUNCTIONS = [
  'getPermissionRegistry',
  'getName',
  'getProposalTime',
  'getTimeForExecution',
  'getMaxActiveProposals',
  'getVotingPowerForProposalCreation',
  'getTokenVault',
  'getLockTime',
  'getVoteGas',
  'getMaxGasPrice',
  'votingPowerPercentageForProposalExecution',
  'votingPowerPercentageForProposalCreation',
  'getMinimumMembersForProposalCreation',
  'getMinimumTokensLockedForProposalCreation',
];

export const useGuildConfig = (guildAddress: string, proposalId?: string) => {
  const { data, ...rest } = useContractReads({
    contracts: GETTER_FUNCTIONS.map(functionName => ({
      addressOrName: guildAddress,
      contractInterface: BaseERC20GuildContract.abi,
      functionName,
    })),
  });
  const { data: token } = useGuildToken(guildAddress);
  const { data: votingPowerForProposalExecution } =
    useVotingPowerForProposalExecution({
      contractAddress: guildAddress,
      proposalId,
    });
  const transformedData = useMemo(() => {
    if (!data) return undefined;
    const [
      permissionRegistry,
      name,
      proposalTime,
      timeForExecution,
      maxActiveProposals,
      votingPowerForProposalCreation,
      tokenVault,
      lockTime,
      voteGas,
      maxGasPrice,
      votingPowerPercentageForProposalExecution,
      votingPowerPercentageForProposalCreation,
      minimumMembersForProposalCreation,
      minimumTokensLockedForProposalCreation,
    ] = data;

    return {
      permissionRegistry: permissionRegistry?.toString(),
      name: name?.toString(),
      proposalTime: proposalTime ? BigNumber.from(proposalTime) : undefined,
      timeForExecution: timeForExecution
        ? BigNumber.from(timeForExecution)
        : undefined,
      maxActiveProposals: maxActiveProposals
        ? BigNumber.from(maxActiveProposals)
        : undefined,
      votingPowerForProposalCreation: votingPowerForProposalCreation
        ? BigNumber.from(votingPowerForProposalCreation)
        : undefined,
      tokenVault: tokenVault?.toString(),
      lockTime: lockTime ? BigNumber?.from(lockTime) : undefined,
      voteGas: voteGas ? BigNumber?.from(voteGas) : undefined,
      maxGasPrice: maxGasPrice ? BigNumber?.from(maxGasPrice) : undefined,
      votingPowerPercentageForProposalExecution:
        votingPowerPercentageForProposalExecution
          ? BigNumber?.from(votingPowerPercentageForProposalExecution)
          : undefined,
      votingPowerPercentageForProposalCreation:
        votingPowerPercentageForProposalCreation
          ? BigNumber?.from(votingPowerPercentageForProposalCreation)
          : undefined,
      minimumMembersForProposalCreation: minimumMembersForProposalCreation
        ? BigNumber?.from(minimumMembersForProposalCreation)
        : undefined,
      minimumTokensLockedForProposalCreation:
        minimumTokensLockedForProposalCreation
          ? BigNumber?.from(minimumTokensLockedForProposalCreation)
          : undefined,
    };
  }, [data]);

  console.log({ lockTime: transformedData?.lockTime?.toString() });

  return {
    data: transformedData
      ? { ...transformedData, votingPowerForProposalExecution, token }
      : undefined,
    ...rest,
  };
};
