import Dexie, { Table } from 'dexie';
import { Transaction } from 'types/types.guilds';

export interface DBTransaction extends Transaction {
  id?: number;
  userAddress: string;
  chainId: number;
}

class IndexedDB extends Dexie {
  transactions!: Table<DBTransaction>;

  constructor() {
    super('DAVI');
    this.version(1).stores({
      transactions: '++id,userAddress,chainId,hash', // Primary key and indexed props
    });
  }
}

export const db = new IndexedDB();
