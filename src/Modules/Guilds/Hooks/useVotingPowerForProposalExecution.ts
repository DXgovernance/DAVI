import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { ReadContractConfig } from '@wagmi/core';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
// import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { SnapshotRepERC20Guild } from 'contracts/ts-files/SnapshotRepERC20Guild';

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
  proposalId?: `0x${string}`;
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
    address: contractAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getVotingPowerForProposalExecution',
    args: [],
  };

  const snapshotConfig = {
    enabled: !!contractAddress && !!snapshotId,
    address: contractAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getVotingPowerForProposalExecution(uint256)',
    args: [snapshotId?.toString()],
  };

  const snapshotRepConf = {
    enabled: !!contractAddress && !!proposalId,
    address: contractAddress,
    abi: SnapshotRepERC20Guild.abi,
    functionName: 'getSnapshotVotingPowerForProposalExecution(bytes32)',
    args: [proposalId],
  };

  const stillLoadingConf = {
    enabled: false,
    address: null,
    abi: SnapshotRepERC20Guild.abi,
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
}: UseVotingPowerForProposalExecutionProps): { data: BigNumber } => {
  const { isSnapshotGuild, isRepGuild, loaded } =
    useGuildImplementationType(contractAddress);

  const { proposalId: FALLBACK_PROPOSAL_ID } = useTypedParams();

  const proposalId: `0x${string}` = proposalIdProp ?? FALLBACK_PROPOSAL_ID;
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
