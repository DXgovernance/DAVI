import { DecodedCall, SupportedAction } from 'Components/ActionsBuilder/types';
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
  to: '0x95a223299319022a842d0dfe4851c145a2f615b9',
  value: BigNumber.from(0),
  args: {
    _to: '0x0000000000000000000000000000000000000000',
    _value: BigNumber.from(1000),
  },
};
