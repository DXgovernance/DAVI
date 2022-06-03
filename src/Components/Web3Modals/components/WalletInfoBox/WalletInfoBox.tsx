import { useWeb3React } from '@web3-react/core';
import { FiCheckCircle, FiCopy, FiExternalLink } from 'react-icons/fi';
import { isMobile, isDesktop } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import {
  getBlockchainLink,
  NETWORK_NAMES,
  shortenAddress,
  MAINNET_ID,
} from 'utils';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import useClipboard from 'hooks/Guilds/useClipboard';
import { findWalletType } from 'provider/connectors';

import { LiveIndicator } from '../LiveIndicator';
import { Button } from 'old-components/Guilds/common/Button';
import Avatar from 'old-components/Guilds/Avatar';

import {
  Wrapper,
  Row,
  ConnectionStatusText,
  ConnectionStatusRow,
  WalletAddressRow,
  ExternalLink,
  ConnectionActionButton,
  AddressText,
  IconHolder,
  CenteredButton,
} from './WalletInfoBox.styled';

interface WalletInfoBoxProps {
  openOptions: () => void;
}

export const WalletInfoBox = ({ openOptions }: WalletInfoBoxProps) => {
  const { account, connector, chainId } = useWeb3React();
  const { ensName, imageUrl } = useENSAvatar(account, MAINNET_ID);
  const [isCopied, copyAddress] = useClipboard(account, 3000);
  const { t } = useTranslation();

  const networkName = NETWORK_NAMES[chainId];

  return (
    <Wrapper>
      <ConnectionStatusRow>
        <ConnectionStatusText>
          <LiveIndicator />
          {t('connectedTo')} {findWalletType(connector)}
        </ConnectionStatusText>
        {isDesktop && (
          <div>
            <Button onClick={openOptions}>{t('change')}</Button>
          </div>
        )}
      </ConnectionStatusRow>

      <WalletAddressRow>
        <IconHolder>
          <Avatar src={imageUrl} defaultSeed={account} size={24} />
        </IconHolder>
        <AddressText>{ensName || shortenAddress(account)}</AddressText>
      </WalletAddressRow>

      <Row>
        <ConnectionActionButton
          variant="minimal"
          onClick={copyAddress}
          iconLeft
        >
          {isCopied ? <FiCheckCircle /> : <FiCopy />}
          {isCopied ? t('copiedAddress') : t('copyAddress')}
        </ConnectionActionButton>

        <ExternalLink
          href={getBlockchainLink(account, networkName, 'address')}
          target="_blank"
        >
          <ConnectionActionButton variant="minimal" iconLeft>
            <FiExternalLink />
            {t('viewOnBlockExplorer')}
          </ConnectionActionButton>
        </ExternalLink>
      </Row>
      {isMobile && (
        <CenteredButton onClick={openOptions}>
          {t('changeConnection')}
        </CenteredButton>
      )}
    </Wrapper>
  );
};
