import { BigNumber } from 'ethers';
import { Call } from '../types';

export const callMock: Call = {
  from: '0x0000000000000000000000000000000000000000',
  to: '',
  data: '0x2e1a7d4d00000000000000000000000000000000000000000000000001aa0b0f33c98800',
  value: BigNumber.from('1000000000000000000'),
};

export const callMockWithApproval: Call = {
  ...callMock,
  approval: {
    amount: BigNumber.from('10000'),
    token: '0x0000000000000000000000000000000000000000',
  },
};
