import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import ERC20ABI from 'contracts/ERC20.json';
import { BigNumber, utils } from 'ethers';

const ERC20Contract = new utils.Interface(ERC20ABI.abi);

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
    _to: '0xaF8eB8C3A5d9d900AA0B98e3Df0bcC17d3C5F698',
    _value: BigNumber.from('5000000000000000000'),
  },
};
