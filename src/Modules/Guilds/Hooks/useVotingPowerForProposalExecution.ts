import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { ReadContractConfig } from '@wagmi/core';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import SnapshotRepERC20Guild from 'contracts/SnapshotRepERC20Guild.json';

/**
 * -  BaseERC20GuildContract
 *    function getVotingPowerForProposalExecution() public view virtual returns (uint256) {}
 *
 * -  SnapshotERC20Guild:
 *    function getVotingPowerForProposalExecution(uint256 snapshotId) public view virtual returns (uint256) {}
 *
 * -  SnapshotRepERC20Guild
 *    function getSnapshotVotingPowerForProposalExecution(bytes32 proposalId) public view virtual returns (uint256) {}
 */

interface UseVotingPowerForProposalExecutionProps {
  contractAddress: string;
  proposalId?: string;
}
interface GetConfigArgs {
  isRepGuild: boolean;
  isSnapshotGuild: boolean;
  loaded: boolean;
  contractAddress: string;
  snapshotId: BigNumber;
  proposalId: string;
}
const getConfig = ({
  isRepGuild,
  isSnapshotGuild,
  loaded,
  contractAddress,
  snapshotId,
  proposalId,
}: GetConfigArgs): ReadContractConfig => {
  const baseErc20Config = {
    enabled: !!contractAddress,
    addressOrName: contractAddress,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'getVotingPowerForProposalExecution',
  };

  const snapshotConfig = {
    enabled: !!contractAddress && !!snapshotId,
    addressOrName: contractAddress,
    contractInterface: SnapshotERC20Guild.abi,
    functionName: 'getVotingPowerForProposalExecution(uint256)',
    args: [snapshotId?.toString()],
  };

  const snapshotRepConf = {
    enabled: !!contractAddress && !!proposalId,
    addressOrName: contractAddress,
    contractInterface: SnapshotRepERC20Guild.abi,
    functionName: 'getSnapshotVotingPowerForProposalExecution(bytes32)',
    args: [proposalId],
  };

  const stillLoadingConf = {
    enabled: false,
    addressOrName: null,
    contractInterface: SnapshotRepERC20Guild.abi,
    functionName: 'getSnapshotVotingPowerForProposalExecution(bytes32)',
    args: [proposalId],
  };

  // Validate args to avoid null values
  if (!loaded) return stillLoadingConf;
  if (isRepGuild && isSnapshotGuild && !!proposalId) return snapshotRepConf;
  if (isSnapshotGuild && !!snapshotId) return snapshotConfig;
  return baseErc20Config;
};

export const useVotingPowerForProposalExecution = ({
  contractAddress,
  proposalId: proposalIdProp,
}: UseVotingPowerForProposalExecutionProps): WagmiUseContractReadResponse<BigNumber> => {
  const { isSnapshotGuild, isRepGuild, loaded } =
    useGuildImplementationType(contractAddress);

  const { proposalId: FALLBACK_PROPOSAL_ID } = useTypedParams();

  const proposalId = proposalIdProp ?? FALLBACK_PROPOSAL_ID;
  const { data: snapshotId } = useSnapshotId({
    contractAddress,
    proposalId,
  });

  const { data, ...rest } = useContractRead(
    getConfig({
      isRepGuild,
      isSnapshotGuild,
      loaded,
      contractAddress,
      snapshotId,
      proposalId,
    })
  );
  return useMemo(() => {
    return {
      data: data ? BigNumber.from(data) : null,
      ...rest,
    };
  }, [data, rest]);
};
