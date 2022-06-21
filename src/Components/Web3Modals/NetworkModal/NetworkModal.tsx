import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';

import { useRpcUrls } from 'provider/providerHooks';
import { getChains } from 'provider/connectors';
import { Modal } from 'Components';
import useNetworkSwitching from 'hooks/Guilds/web3/useNetworkSwitching';
import { getChainIcon } from 'utils';
import { Option } from '../components';
import {
  Wrapper,
  ContentWrapper,
  UpperSection,
  OptionGrid,
} from './NetworkModal.styled';
import { NetworkModalProps } from './types';

const NetworkModal: React.FC<NetworkModalProps> = ({ isOpen, onClose }) => {
  const { chainId } = useWeb3React();
  const rpcUrls = useRpcUrls();
  const { trySwitching } = useNetworkSwitching();
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
            {rpcUrls && (
              <OptionGrid>
                {getChains(rpcUrls).map(chain => (
                  <Option
                    onClick={() => trySwitching(chain).then(onClose)}
                    key={chain.name}
                    icon={getChainIcon(chain.id)}
                    active={chain.id === chainId}
                    header={chain.displayName}
                  />
                ))}
              </OptionGrid>
            )}
          </ContentWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  );
};

export default NetworkModal;
