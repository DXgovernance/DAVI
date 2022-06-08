import React from 'react';

import IPFSService from '../services/IPFSService';
import PinataService from '../services/PinataService';
import CoingeckoService from '../services/CoingeckoService';
import InfuraService from '../services/InfuraService';
import PoktService from '../services/PoktService';
import AlchemyService from '../services/AlchemyService';
import CustomRpcService from '../services/CustomRpcService';
import ENSService from '../services/ENSService';
import SubgraphService from '../services/SubgraphService';
import OrbitDBService from '../services/OrbitDBService';

import ProviderStore from '../stores/Provider';
import ConfigStore from '../stores/ConfigStore';
import ModalStore from '../stores/Modal';

/*
https://reactjs.org/docs/context.html#reactcreatecontext

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

A root single context calss is exported with the services and stores of the dapp.

Services: Contexts that are not use to store data, only to process information in the dapp and fecth information from external protocols and APIs.
Stores: Context that are used to store data and expose them all around the dapp.
*/

export default class RootContext {
  providerStore: ProviderStore;
  configStore: ConfigStore;
  modalStore: ModalStore;

  ipfsService: IPFSService;
  pinataService: PinataService;
  coingeckoService: CoingeckoService;
  infuraService: InfuraService;
  poktService: PoktService;
  alchemyService: AlchemyService;
  customRpcService: CustomRpcService;
  ensService: ENSService;
  subgraphService: SubgraphService;
  orbitDBService: OrbitDBService;

  constructor() {
    this.providerStore = new ProviderStore(this);
    this.configStore = new ConfigStore(this);
    this.modalStore = new ModalStore(this);

    this.ipfsService = new IPFSService(this);
    this.pinataService = new PinataService(this);
    this.coingeckoService = new CoingeckoService(this);
    this.infuraService = new InfuraService(this);
    this.poktService = new PoktService(this);
    this.alchemyService = new AlchemyService(this);
    this.customRpcService = new CustomRpcService(this);
    this.ensService = new ENSService(this);
    this.subgraphService = new SubgraphService(this);
    this.orbitDBService = new OrbitDBService(this);
  }

  reset() {
    this.configStore.reset();
    this.modalStore.reset();
  }
}

export const rootContext = React.createContext({
  context: new RootContext(),
});

export const useContext = () => React.useContext(rootContext);
