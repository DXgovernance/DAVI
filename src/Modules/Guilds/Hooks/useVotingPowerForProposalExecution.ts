import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import { WagmiUseContractReadResponse } from 'Modules/Guilds/Hooks/types';
import useSnapshotId from 'Modules/Guilds/Hooks/useSnapshotId';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import ERC20GuildContract from 'contracts/ERC20Guild.json';
import SnapshotERC20Guild from 'contracts/SnapshotERC20Guild.json';
import SnapshotRepERC20Guild from 'contracts/SnapshotRepERC20Guild.json';

/**
 * -  ERC20GuildContract
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

const getConfig = ({
  isRepGuild,
  isSnapshotGuild,
  contractAddress,
  snapshotId,
  _proposalId,
}) => {
  const baseErc20Config = {
    enabled: !!contractAddress,
    addressOrName: contractAddress,
    contractInterface: ERC20GuildContract.abi,
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
    enabled: !!contractAddress && !!_proposalId,
    addressOrName: contractAddress,
    contractInterface: SnapshotRepERC20Guild.abi,
    functionName: 'getSnapshotVotingPowerForProposalExecution(bytes32)',
    args: [_proposalId],
  };

  if (isRepGuild && isSnapshotGuild) return snapshotRepConf;
  if (isSnapshotGuild) return snapshotConfig;
  return baseErc20Config;
};

export const useVotingPowerForProposalExecution = ({
  contractAddress,
  proposalId,
}: UseVotingPowerForProposalExecutionProps): WagmiUseContractReadResponse<BigNumber> => {
  const { isSnapshotGuild, isRepGuild } =
    useGuildImplementationType(contractAddress);

  const { proposalId: FALLBACK_PROPOSAL_ID } = useTypedParams();

  const _proposalId = proposalId ?? FALLBACK_PROPOSAL_ID;
  const { data: snapshotId } = useSnapshotId({
    contractAddress,
    proposalId: _proposalId,
  });

  const { data, ...rest } = useContractRead(
    getConfig({
      isRepGuild,
      isSnapshotGuild,
      contractAddress,
      snapshotId,
      _proposalId,
    })
  );
  return useMemo(() => {
    return {
      data: data ? BigNumber.from(data) : null,
      ...rest,
    };
  }, [data, rest]); // eslint-disable-line
};
