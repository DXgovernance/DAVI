import { BigNumber } from 'ethers';

export interface SetGuildConfigEditorProps {
  asset: string;
  to: string;
  functionSignature: string;
  valueAllowed: BigNumber;
  allowance: boolean;
  functionName: string;
  tab?: number;
}

