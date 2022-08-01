import { DecodedCall } from 'Components/ActionsBuilder/types';

export type UpdateENSContentDecodedCall = Pick<DecodedCall, 'from' | 'to'> & {
  node: string;
  contentHash: string;
  optionalProps?: Record<string, string>;
};
