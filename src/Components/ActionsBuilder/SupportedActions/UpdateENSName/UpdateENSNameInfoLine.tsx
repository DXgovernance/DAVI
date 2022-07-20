import { Segment } from '../common/infoLine';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { FiArrowRight, FiNavigation } from 'react-icons/fi';
import Avatar from 'old-components/Guilds/Avatar';
import { MAINNET_ID, shortenAddress } from 'utils';
import { useUpdateEnsName } from 'hooks/Guilds/guild/useUpdateEnsName';

const UpdateENSNameInfoLine = ({ decodedCall }) => {
  console.log({ decodedCall });
  const { parsedData } = useUpdateEnsName({ decodedCall });
  
  const { ensName, imageUrl } = useENSAvatar(parsedData?.to, MAINNET_ID);
  
  // Get nameHash from decodedCall
  // Use hook to call Public Resolver method to get canonical name

  return (
    <>
      <Segment>
        <FiNavigation size={16} />
      </Segment>
      <Segment>{'Update ENS Name'}</Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      <Segment>
        <Avatar defaultSeed={ensName} src={imageUrl} size={24} />
      </Segment>
      <Segment>
        {ensName || parsedData?.to ? shortenAddress(parsedData?.to) : ''}
      </Segment>
    </>
  );
};

export default UpdateENSNameInfoLine;
