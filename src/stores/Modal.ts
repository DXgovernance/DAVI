// import { makeObservable, observable, action } from 'mobx';
import RootContext from '../contexts';

export default class ModalStore {
  walletModalVisible: boolean;
  networkModalVisible: boolean;
  context: RootContext;

  constructor(context) {
    this.context = context;
    this.walletModalVisible = false;
    this.networkModalVisible = false;
  }

  reset() {
    this.walletModalVisible = false;
    this.networkModalVisible = false;
  }

  toggleWalletModal() {
    this.walletModalVisible = !this.walletModalVisible;
  }

  setWalletModalVisible(visible: boolean) {
    this.walletModalVisible = visible;
  }

  toggleNetworkModal() {
    this.networkModalVisible = !this.networkModalVisible;
  }

  setNetworkModalVisible(visible: boolean) {
    this.networkModalVisible = visible;
  }
}
