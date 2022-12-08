import { Segment } from 'components/ActionsBuilder/SupportedActions/common/infoLine';
import { Avatar } from 'components/Avatar';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useMemo } from 'react';
import { MAINNET_ID, shortenAddress } from 'utils';
import { resolveUri } from 'utils/url';
import { Chain, useNetwork } from 'wagmi';
import { Flex } from '../Layout';
import { ExternalLink } from './ExternalLink';
import { BlockExplorerLinkProps } from './types';

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
  shortAddress = false,
  avatarSize = 24,
  disableLink = false,
}) => {
  const { chain } = useNetwork();
  const { ensName, imageUrl } = useENSAvatar(address, MAINNET_ID);
  const { data: erc20Info } = useERC20Info(address);
  const { tokens } = useTokenList(chain.id);

  const detailedTokenData = useMemo(() => {
    if (!erc20Info || !tokens) return null;

    return tokens.find(
      ({ address: detailedTokenAddress }) => detailedTokenAddress === address
    );
  }, [tokens, erc20Info, address]);

  if (!address) return null;

  const blockExplorerUrl = getBlockExplorerUrl(chain, address, 'address');

  return (
    <Flex
      direction="row"
      justifyContent="left"
      data-testid="block-explorer-container"
    >
      {showAvatar && (
        <Segment>
          <Avatar
            defaultSeed={address}
            src={resolveUri(detailedTokenData?.logoURI) || imageUrl}
            size={avatarSize}
            data-testid="avatar"
          />
        </Segment>
      )}
      {disableLink ? (
        <div>
          {erc20Info?.symbol ||
            ensName ||
            (shortAddress ? shortenAddress(address) : address)}
        </div>
      ) : (
        <ExternalLink href={blockExplorerUrl} data-testid="external-link">
          {erc20Info?.symbol ||
            ensName ||
            (shortAddress ? shortenAddress(address) : address)}
        </ExternalLink>
      )}
    </Flex>
  );
};
