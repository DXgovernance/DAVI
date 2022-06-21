import { DecodedCall, SupportedAction } from 'Components/ActionsBuilder/types';
import { BigNumber, utils } from 'ethers';
import ERC20SnapshotRep from 'contracts/ERC20SnapshotRep.json';

const ERC20SnapshotRepContract = new utils.Interface(ERC20SnapshotRep.abi);

export const repMintEmptyDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.REP_MINT,
  function: ERC20SnapshotRepContract.getFunction('mint'),
  to: '',
  value: BigNumber.from(0),
  args: {
    to: '',
    amount: BigNumber.from(0),
  },
};

export const repMintDecodedCallMock: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.REP_MINT,
  function: ERC20SnapshotRepContract.getFunction('mint'),
  to: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
  value: BigNumber.from(0),
  args: {
    to: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
    amount: BigNumber.from(10000),
  },
};
