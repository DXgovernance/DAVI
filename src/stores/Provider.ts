import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import RootContext from '../contexts';

export enum ContractType {
  ERC20 = 'ERC20',
  Avatar = 'Avatar',
  Controller = 'Controller',
  Reputation = 'Reputation',
  PermissionRegistry = 'PermissionRegistry',
  VotingMachine = 'VotingMachine',
  DXDVotingMachine = 'DXDVotingMachine',
  WalletScheme1_0 = 'WalletScheme1_0',
  WalletScheme1_1 = 'WalletScheme1_0',
  Multicall = 'Multicall',
  Redeemer = 'Redeemer',
}

export interface ChainData {
  currentBlockNumber: number;
}

export default class ProviderStore {
  context: RootContext;
  web3Context: Web3ReactContextInterface;
  chainData: ChainData;

  constructor(context: RootContext) {
    this.context = context;
    this.web3Context = null;
    this.chainData = { currentBlockNumber: -1 };
  }

  getCurrentBlockNumber(): number {
    return this.chainData.currentBlockNumber;
  }

  setCurrentBlockNumber(blockNumber: number): void {
    console.debug('[ProviderStore] Setting current block number', blockNumber);
    this.chainData.currentBlockNumber = blockNumber;
  }

  getActiveWeb3React(): Web3ReactContextInterface {
    return this.web3Context;
  }

  setWeb3Context(context: Web3ReactContextInterface) {
    console.debug('[ProviderStore] Setting Web3 context', context);
    this.web3Context = context;
  }
}
