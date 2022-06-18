// import { makeObservable, observable, action } from 'mobx';
import RootContext from '../contexts';

import {
  getNetworkByName,
  NETWORK_NAMES,
  NETWORK_DISPLAY_NAMES,
  DEFAULT_CHAIN_ID,
} from '../utils';

const arbitrum = require('../configs/arbitrum/config.json');
const arbitrumTestnet = require('../configs/arbitrumTestnet/config.json');
const mainnet = require('../configs/mainnet/config.json');
const xdai = require('../configs/xdai/config.json');
const goerli = require('../configs/goerli/config.json');
const localhost = require('../configs/localhost/config.json');

const appConfig = {
  arbitrum,
  arbitrumTestnet,
  mainnet,
  xdai,
  goerli,
  localhost,
};

export default class ConfigStore {
  darkMode: boolean;
  networkConfigLoaded: boolean;
  context: RootContext;
  networkConfig: NetworkConfig;

  constructor(context) {
    this.context = context;
    this.darkMode = false;
    this.networkConfigLoaded = false;
  }

  reset() {
    this.networkConfig = appConfig[this.getActiveChainName()];
    this.networkConfigLoaded = false;
  }

  getActiveChainName() {
    return NETWORK_NAMES[
      this.context?.providerStore.getActiveWeb3React().chainId ||
        DEFAULT_CHAIN_ID
    ];
  }

  getActiveChainDisplayName() {
    return NETWORK_DISPLAY_NAMES[
      this.context?.providerStore.getActiveWeb3React().chainId ||
        DEFAULT_CHAIN_ID
    ];
  }

  getLocalConfig() {
    const defaultAppConfigs = appConfig;
    const defaultConfig = {
      etherscan: '',
      pinata: '',
      rpcType: '',
      infura: '',
      alchemy: '',
      pinOnStart: false,
      mainnet_toBlock: defaultAppConfigs.mainnet.cache.toBlock,
      mainnet_rpcURL: getNetworkByName('mainnet').defaultRpc,
      xdai_toBlock: defaultAppConfigs.xdai.cache.toBlock,
      xdai_rpcURL: getNetworkByName('xdai').defaultRpc,
      goerli_rpcURL: getNetworkByName('goerli').defaultRpc,
      arbitrum_toBlock: defaultAppConfigs.arbitrum.cache.toBlock,
      arbitrum_rpcURL: getNetworkByName('arbitrum').defaultRpc,
      arbitrumTestnet_toBlock: defaultAppConfigs.arbitrumTestnet.cache.toBlock,
      arbitrumTestnet_rpcURL: getNetworkByName('arbitrumTestnet').defaultRpc,
    };
    const configInLocalStorage = localStorage.getItem('davi-config')
      ? JSON.parse(localStorage.getItem('davi-config'))
      : {};
    return Object.assign(defaultConfig, configInLocalStorage);
  }

  setLocalConfig(config) {
    localStorage.setItem('davi-config', JSON.stringify(config));
  }

  resetLocalConfig() {
    const defaultAppConfigs = appConfig;
    localStorage.setItem(
      'davi-config',
      JSON.stringify({
        etherscan: '',
        pinata: '',
        rpcType: '',
        infura: '',
        alchemy: '',
        pinOnStart: false,
        mainnet_toBlock: defaultAppConfigs.mainnet.cache.toBlock,
        mainnet_rpcURL: getNetworkByName('mainnet').defaultRpc,
        xdai_toBlock: defaultAppConfigs.xdai.cache.toBlock,
        xdai_rpcURL: getNetworkByName('xdai').defaultRpc,
        goerli_rpcURL: getNetworkByName('goerli').defaultRpc,
        arbitrum_toBlock: defaultAppConfigs.arbitrum.cache.toBlock,
        arbitrum_rpcURL: getNetworkByName('arbitrum').defaultRpc,
        arbitrumTestnet_toBlock:
          defaultAppConfigs.arbitrumTestnet.cache.toBlock,
        arbitrumTestnet_rpcURL: getNetworkByName('arbitrumTestnet').defaultRpc,
      })
    );
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  setDarkMode(visible: boolean) {
    this.darkMode = visible;
  }

  getTokenData(tokenAddress) {
    return this.networkConfig.tokens.find(
      tokenInFile => tokenInFile.address === tokenAddress
    );
  }

  getNetworkContracts(): NetworkContracts {
    return this.networkConfig.contracts;
  }

  getTokensOfNetwork() {
    return this.networkConfig.tokens;
  }

  getTokensToFetchPrice() {
    return this.networkConfig.tokens.filter(
      tokenInFile => tokenInFile.fetchPrice
    );
  }
}
