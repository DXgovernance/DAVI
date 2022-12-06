import { DecodedCall } from 'components/ActionsBuilder/types';

export type UpdateENSContentDecodedCall = Pick<DecodedCall, 'to'> & {
  from: `0x${string}`;
  node: string;
  contentHash: string;
  optionalProps?: Record<string, string>;
};

export interface ENSContentForm {
  ensName: string;
  ipfsHash: string;
}
