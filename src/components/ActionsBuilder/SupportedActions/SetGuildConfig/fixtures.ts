import { BigNumber, utils } from 'ethers';
import { SupportedAction } from 'components/ActionsBuilder/types';
import BaseERC20Guild from 'contracts/BaseERC20Guild.json';

export const mockBigNumber = BigNumber.from(100000000);
export const BaseERC20GuildContract = new utils.Interface(BaseERC20Guild.abi);

export const emptyDecodedCall = {
  from: '',
  callType: SupportedAction.SET_GUILD_CONFIG,
  function: BaseERC20GuildContract.getFunction('setConfig'),
  to: '',
  value: BigNumber.from(0),
  args: {
    _proposalTime: '',
    _timeForExecution: '',
    _votingPowerPercentageForProposalExecution: '',
    _votingPowerPercentageForProposalCreation: '',
    _voteGas: '',
    _maxGasPrice: '',
    _maxActiveProposals: '',
    _lockTime: '',
    _minimumMembersForProposalCreation: '',
    _minimumTokensLockedForProposalCreation: '',
  },
  optionalProps: {},
};
