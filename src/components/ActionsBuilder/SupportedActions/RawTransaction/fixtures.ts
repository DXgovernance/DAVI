import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import { BigNumber } from 'ethers';
import { MOCK_ADDRESS } from 'hooks/Guilds/ens/fixtures';

export const rawDataCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.RAW_TRANSACTION,
  function: null,
  to: MOCK_ADDRESS,
  value: BigNumber.from('1000000000000000000'),
  args: null,
  optionalProps: {
    data: '0x01',
  },
};
