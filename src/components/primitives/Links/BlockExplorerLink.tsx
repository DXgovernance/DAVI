import { Segment } from 'components/ActionsBuilder/SupportedActions/common/infoLine';
import { Avatar } from 'components/Avatar';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { MAINNET_ID, shortenAddress } from 'utils';
import { Chain, useNetwork } from 'wagmi';
import { ExternalLink } from './ExternalLink';
import { FlexContainer } from './styles';
import { BlockExplorerLinkProps } from './types';

// this code is duplicated from provider/chain.ts because there was a circular dependency when testing
const getBlockExplorerUrl = (
  chain: Chain,
  address: string,
  type: 'address' | 'tx'
) => {
  if (!chain || !chain?.blockExplorers?.default) return null;

  return `${chain.blockExplorers.default.url}/${type}/${address}`;
};

export const BlockExplorerLink: React.FC<BlockExplorerLinkProps> = ({
  address,
  showAvatar,
  unstyled,
  shortAddress,
  avatarSize = 24,
}) => {
  const { chain } = useNetwork();
  const { ensName, imageUrl } = useENSAvatar(address, MAINNET_ID);
  if (!address) return null;

  const blockExplorerUrl = getBlockExplorerUrl(chain, address, 'address');

  return (
    <FlexContainer>
      {showAvatar && (
        <Segment>
          <Avatar defaultSeed={address} src={imageUrl} size={avatarSize} />
        </Segment>
      )}
      <ExternalLink href={blockExplorerUrl} unstyled={unstyled}>
        {ensName || shortAddress ? shortenAddress(address) : address}
      </ExternalLink>
    </FlexContainer>
  );
};
