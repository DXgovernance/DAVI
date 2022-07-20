import { JsonRpcProvider } from '@ethersproject/providers';
import { Connector } from 'wagmi';
import { normalizeChainId } from '@wagmi/core';
import { ZERO_ADDRESS } from 'utils';

export const READ_ONLY_CONNECTOR_ID = 'readOnly';

export type InjectedConnectorOptions = {
  /** Name of connector */
  name?: string | ((detectedName: string | string[]) => string);
};

export class ReadOnlyConnector extends Connector<
  JsonRpcProvider,
  InjectedConnectorOptions
> {
  readonly id = READ_ONLY_CONNECTOR_ID;
  readonly name = 'Read-Only Mode';
  readonly ready = true || (typeof window != 'undefined' && !window.ethereum);

  #provider?: JsonRpcProvider;

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      let targetChainId = chainId;
      if (!targetChainId) {
        const lastUsedChainId = await this.getChainId();
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
          targetChainId = lastUsedChainId;
      }

      const provider = await this.getProvider({
        chainId: targetChainId,
        create: true,
      });
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);

      const account = ZERO_ADDRESS;
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);

      return {
        account,
        chain: { id, unsupported },
        provider,
      };
    } catch (error) {
      throw error;
    }
  }

  async disconnect() {
    const provider = await this.getProvider();

    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
  }

  async getAccount() {
    return ZERO_ADDRESS;
  }

  async getChainId() {
    const provider = await this.getProvider();
    const network = await provider.getNetwork();
    const chainId = normalizeChainId(network.chainId);
    return chainId;
  }

  async getProvider({
    chainId,
    create,
  }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      const rpcUrl = this.chains.find(chain => chain.id === chainId)?.rpcUrls
        .default;

      this.#provider = new JsonRpcProvider(rpcUrl, chainId);
    }

    return this.#provider;
  }

  async getSigner() {
    const provider = await this.getProvider();
    return provider.getSigner();
  }

  async isAuthorized() {
    return true;
  }

  async switchChain(chainId: number) {
    await this.getProvider({ chainId, create: true });
    this.onChainChanged(chainId);
    return this.chains.find(x => x.id === chainId);
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect');
    else this.emit('change', { account: null });
  };

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  };

  protected onDisconnect = () => {
    this.emit('disconnect');
  };
}
