import { BigNumber } from 'ethers';
import { utils } from 'ethers';
import {
  RichContractData,
  RichContractFunction,
} from 'hooks/Guilds/contracts/useRichContractRegistry';

export enum SupportedAction {
  NATIVE_TRANSFER = 'NATIVE_TRANSFER',
  ERC20_TRANSFER = 'ERC20_TRANSFER',
  REP_MINT = 'REP_MINT',
  GENERIC_CALL = 'GENERIC_CALL',
  SET_PERMISSIONS = 'SET_PERMISSIONS',
  ENS_UPDATE_CONTENT = 'ENS_UPDATE_CONTENT',
}

export interface Call {
  from: string;
  to: string;
  data: string;
  value: BigNumber;
  approval?: ApproveSendTokens;
  functionName?: string;
  approvalCall?: Call;
}

export interface DecodedCall {
  callType: SupportedAction;
  from: string;
  to: string;
  value: BigNumber;
  function: utils.FunctionFragment;
  args: Record<string, any>;
  richData?: RichContractData;
  richFunctionData?: RichContractFunction;
  functionName?: string;
  optionalProps?: Record<string, string>;
}

export interface DecodedAction {
  id: string;
  decodedCall: DecodedCall;
  contract: utils.Interface;
  approval?: ApproveSendTokens;
  simulationResult?: any;
}

export interface Option {
  id: string;
  label: string;
  color: string;
  actions?: Call[];
  decodedActions?: DecodedAction[];
  totalVotes?: BigNumber;
  votePercentage?: number;
}

export interface ApproveSendTokens {
  amount: BigNumber;
  token: string;
}
