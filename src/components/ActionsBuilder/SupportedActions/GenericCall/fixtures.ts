import {
  ApproveSendTokens,
  DecodedCall,
  SupportedAction,
} from 'components/ActionsBuilder/types';
import ERC20 from 'contracts/ERC20.json';
import { BigNumber, utils } from 'ethers';

const ERC20Contract = new utils.Interface(ERC20.abi);

export const genericDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.GENERIC_CALL,
  function: ERC20Contract.getFunction('increaseAllowance'),
  to: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
  value: BigNumber.from(0),
  args: {
    param1: BigNumber.from(10000),
    param2: BigNumber.from(10000),
    param3: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
  },
};

export const approvetokenSpendingMock: ApproveSendTokens = {
  callType: SupportedAction.GENERIC_CALL,
  from: '0x0000000000000000000000000000000000000000',
  to: '0x0000000000000000000000000000000000000000',
  value: BigNumber.from(0),
  function: null,
  args: {},
  amount: BigNumber.from(1000),
  token: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
};
