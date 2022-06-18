import {
  ApproveSendTokens,
  DecodedCall,
  SupportedAction,
} from 'Components/ActionsBuilder/types';
import ERC20ABI from 'contracts/ERC20.json';
import { BigNumber, utils } from 'ethers';

const ERC20Contract = new utils.Interface(ERC20ABI.abi);

export const emptyDecodedCallMock: DecodedCall = {
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

export const decodedCallMock: DecodedCall = {
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

export const approvetokenSpendingMock: ApproveSendTokens = {
  amount: BigNumber.from(1000),
  token: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
};
