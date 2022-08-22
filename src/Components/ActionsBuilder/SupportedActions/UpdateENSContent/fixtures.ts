import { BigNumber, utils } from 'ethers';
import { DecodedCall } from 'Components/ActionsBuilder/types';
import { SupportedAction } from 'Components/ActionsBuilder/types';
import ENSPublicResolver from 'contracts/ENSPublicResolver.json';

const ENSPublicResolverContract = new utils.Interface(ENSPublicResolver.abi);

export const mockDecodedCallUpdateENSContent: DecodedCall = {
  from: '0x0000000000000000000000000000000000000000',
  callType: SupportedAction.ENS_UPDATE_CONTENT,
  function: ENSPublicResolverContract.getFunction('setContenthash'),
  to: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
  value: BigNumber.from(0),
  args: {
    node: '0x0000000000000000000000000000000000000000',
    hash: '0x0000000000000000000000000000000000000000',
  },
  optionalProps: {
    ensName: 'test',
    ipfsHash: 'Qm',
  },
};
