import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import ERC20 from 'contracts/ERC20.json';
import { BigNumber, utils } from 'ethers';
import { MOCK_ADDRESS } from 'hooks/Guilds/ens/fixtures';

const ERC20Contract = new utils.Interface(ERC20.abi);

export const erc20TransferEmptyDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.ERC20_TRANSFER,
  function: ERC20Contract.getFunction('transfer'),
  to: '',
  value: BigNumber.from(0),
  args: {
    _to: '',
    _value: BigNumber.from(0),
  },
};

export const erc20TransferDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.ERC20_TRANSFER,
  function: ERC20Contract.getFunction('transfer'),
  to: '0xfFb1cd0F95368DDd06D556161c5D3d9f0f4Fe6d2',
  value: BigNumber.from(0),
  args: {
    _to: MOCK_ADDRESS,
    _value: BigNumber.from('5000000000000000000'),
  },
};
