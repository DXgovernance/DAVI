import { Segment } from '../common/infoLine';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { FiArrowRight, FiNavigation } from 'react-icons/fi';
import Avatar from 'old-components/Guilds/Avatar';
import { MAINNET_ID, shortenAddress } from 'utils';

const UpdateENSNameInfoLine = ({ decodedCall }) => {
  const parsedData = {
    to: ['0x0000000000000000000000000000000000000000'],
  };
  const { ensName, imageUrl } = useENSAvatar(parsedData?.to[0], MAINNET_ID);

  // Get nameHash from decodedCall
  // Use hook to call Public Resolver method to get canonical name

  return (
    <>
      <Segment>
        <FiNavigation size={16} />
      </Segment>
      <Segment>{'ENS Name'}</Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      <Segment>
        <Avatar defaultSeed={'hello'} src={imageUrl} size={24} />
      </Segment>
      <Segment>
        {ensName || parsedData?.to[0] ? shortenAddress(parsedData?.to[0]) : ''}
      </Segment>
    </>
  );
};

export default UpdateENSNameInfoLine;
