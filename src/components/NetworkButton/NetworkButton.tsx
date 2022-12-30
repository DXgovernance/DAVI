import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getChainIcon } from 'utils';
import { Button, ButtonIcon, IconButton } from 'components/primitives/Button';
import { NetworkModal } from 'components/Web3Modals/NetworkModal';
import { useAccount, useNetwork } from 'wagmi';

const NetworkButton = () => {
  const { t } = useTranslation();
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const toggleNetworkModal = () => {
    setIsNetworkModalOpen(!isNetworkModalOpen);
  };

  function getNetworkStatus() {
    if (isConnected && chain?.unsupported) {
      return (
        <Button onClick={toggleNetworkModal}>{t('unsupportedNetwork')}</Button>
      );
    } else if (isConnected) {
      return (
        <IconButton
          data-testid="change-network-btn"
          onClick={toggleNetworkModal}
          iconLeft
        >
          <ButtonIcon src={getChainIcon(chain.id)} alt={'Icon'} />
          {chain.name}
        </IconButton>
      );
    } else {
      return <Button onClick={toggleNetworkModal}>{t('notConnected')}</Button>;
    }
  }

  return (
    <>
      {getNetworkStatus()}
      <NetworkModal isOpen={isNetworkModalOpen} onClose={toggleNetworkModal} />
    </>
  );
};

export default NetworkButton;
