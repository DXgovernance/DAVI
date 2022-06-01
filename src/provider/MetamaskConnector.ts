import { InjectedConnector } from '@web3-react/injected-connector';

export class MetamaskConnector extends InjectedConnector {
  public async isAuthorized(): Promise<boolean> {
    // @ts-ignore
    if (!window.ethereum) {
      return false;
    }

    try {
      const provider = await this.getProvider();
      return !!(provider && provider['selectedAddress']);
    } catch {
      return false;
    }
  }
}
