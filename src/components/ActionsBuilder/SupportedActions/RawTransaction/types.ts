import { BigNumber } from 'ethers';

export interface RawTransactionValues {
  to: string;
  value: BigNumber;
  data: string;
}
