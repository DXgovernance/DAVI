import { useTranslation } from 'react-i18next';
import { Modal } from 'Components/Primitives/Modal';
import { getChainIcon } from 'utils';
import { Option } from '../components/Option';
import {
  Wrapper,
  ContentWrapper,
  UpperSection,
  OptionGrid,
} from './NetworkModal.styled';
import { NetworkModalProps } from './types';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const NetworkModal: React.FC<NetworkModalProps> = ({ isOpen, onClose }) => {
  const { isConnected } = useAccount();
  const { chains, chain: activeChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { t } = useTranslation();

  return (
    <Modal
      header={<div>{t('switchNetwork')}</div>}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={380}
    >
      <Wrapper>
        <UpperSection>
          <ContentWrapper>
            <OptionGrid>
              {chains.map(chain => (
                <Option
                  onClick={() =>
                    switchNetwork ? switchNetwork(chain.id) : null
                  }
                  key={chain.name}
                  icon={getChainIcon(chain.id)}
                  active={isConnected && chain.id === activeChain.id}
                  header={chain.name}
                />
              ))}
            </OptionGrid>
          </ContentWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  );
};

export default NetworkModal;
