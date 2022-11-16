import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/primitives/Button';
import { WalletModal } from 'components/Web3Modals';
import { useTransactions } from 'contexts/Guilds';
import { useAccount, useNetwork } from 'wagmi';
import AddressButton from 'components/AddressButton/AddressButton';
import { isReadOnly } from 'provider/wallets';
import useSwitchNetwork from 'hooks/Guilds/web3/useSwitchNetwork';

const WalletButton = () => {
  const { t } = useTranslation();

  const { isConnected, address, connector } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain, chains } = useNetwork();

  const { transactions } = useTransactions();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  function getWalletStatus() {
    if (isConnected && chain.unsupported) {
      const firstSupported = chains && chains?.length > 0 ? chains[0] : null;

      return (
        <Button
          variant="primary"
          onClick={() =>
            switchNetwork ? switchNetwork(firstSupported?.id) : null
          }
        >
          {switchNetwork
            ? t('switchWalletTo', { chainName: firstSupported?.name })
            : t('unsupportedNetwork')}
        </Button>
      );
    }

    if (isConnected && !isReadOnly(connector)) {
      return (
        <AddressButton
          address={address}
          transactionsCounter={
            transactions?.filter(transaction => !transaction.receipt)?.length ??
            0
          }
          onClick={toggleWalletModal}
        />
      );
    } else {
      return (
        <Button data-testid="connect-wallet-btn" onClick={toggleWalletModal}>
          {t('connectWallet')}
        </Button>
      );
    }
  }

  return (
    <>
      {getWalletStatus()}
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
    </>
  );
};

export default WalletButton;
