import { FiCheckCircle, FiCopy, FiExternalLink } from 'react-icons/fi';
import { isMobile, isDesktop } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { shortenAddress } from 'utils';
import useClipboard from 'hooks/Guilds/useClipboard';
import { LiveIndicator } from '../LiveIndicator';
import { Button } from 'components/primitives/Button';
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
import { useAccount, useEnsName, useNetwork } from 'wagmi';
import { ENSAvatar } from 'components/Avatar';
import { getBlockExplorerUrl } from 'provider';

interface WalletInfoBoxProps {
  openOptions: () => void;
}

export const WalletInfoBox = ({ openOptions }: WalletInfoBoxProps) => {
  const { address, connector } = useAccount();
  const { chain } = useNetwork();
  const { data: ensName } = useEnsName({ address, chainId: 1 });
  const [isCopied, copyAddress] = useClipboard(address, 3000);
  const { t } = useTranslation();

  return (
    <Wrapper>
      <ConnectionStatusRow>
        <ConnectionStatusText>
          <LiveIndicator />
          {t('connectedTo', { walletName: connector.name })}
        </ConnectionStatusText>
        {isDesktop && (
          <div>
            <Button variant="secondary" onClick={openOptions}>
              {t('change')}
            </Button>
          </div>
        )}
      </ConnectionStatusRow>

      <WalletAddressRow>
        <IconHolder>
          <ENSAvatar address={address} size={24} />
        </IconHolder>
        <AddressText>{ensName || shortenAddress(address)}</AddressText>
      </WalletAddressRow>

      <Row>
        <ConnectionActionButton onClick={copyAddress}>
          {isCopied ? <FiCheckCircle /> : <FiCopy />}
          {isCopied ? t('copiedAddress') : t('copyAddress')}
        </ConnectionActionButton>

        <ExternalLink
          href={getBlockExplorerUrl(chain, address, 'address')}
          target="_blank"
        >
          <ConnectionActionButton>
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
