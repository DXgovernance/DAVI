import { BigNumber } from 'ethers';
import { Call, SupportedAction } from '../types';

export const MOCK_ADDRESS = '0x0000000000000000000000000000000000000000';
export const MOCK_ENS_NAME = 'name.eth';

export const callMock: Call = {
  from: '0x0000000000000000000000000000000000000000',
  to: '',
  data: '0x2e1a7d4d00000000000000000000000000000000000000000000000001aa0b0f33c98800',
  value: BigNumber.from('1000000000000000000'),
};

export const callMockWithApproval: Call = {
  ...callMock,
  approval: {
    callType: SupportedAction.GENERIC_CALL,
    from: '0x0000000000000000000000000000000000000000',
    to: '0x0000000000000000000000000000000000000000',
    value: BigNumber.from(0),
    function: null,
    args: {},
    amount: BigNumber.from('10000'),
    token: '0x0000000000000000000000000000000000000000',
  },
};
