import { Segment } from 'components/ActionsBuilder/SupportedActions/common/infoLine';
import { Avatar } from 'components/Avatar';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useUpdateEnsContent } from 'hooks/Guilds/useUpdateEnsContent';
import { MAINNET_ID } from 'utils';
import { Chain, useNetwork } from 'wagmi';
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
  decodedCall,
  showAvatar,
}) => {
  const { chain } = useNetwork();
  const { parsedData } = useUpdateEnsContent({ decodedCall });
  const { ensName, imageUrl } = useENSAvatar(decodedCall.to, MAINNET_ID);

  const blockExplorerUrl = getBlockExplorerUrl(
    chain,
    parsedData?.from,
    'address'
  );

  return (
    <>
      {showAvatar && (
        <Segment>
          <Avatar defaultSeed={decodedCall.to} src={imageUrl} size={24} />
        </Segment>
      )}
      <ExternalLink href={blockExplorerUrl}>
        {ensName || decodedCall.to}
      </ExternalLink>
    </>
  );
};
