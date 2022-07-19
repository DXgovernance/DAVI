import { DetailCell, DetailHeader, DetailRow } from '../common/summary';
import { Segment } from '../common/infoLine';
import Avatar from 'old-components/Guilds/Avatar';
import { MAINNET_ID, shortenAddress } from 'utils';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';

const UpdateENSNameSummary = () => {
  const parsedData = {
    to: ['0x0000000000000000000000000000000000000000'],
  };
  const { ensName, imageUrl } = useENSAvatar(parsedData?.to[0], MAINNET_ID);

  return (
    <>
      <DetailHeader>
        <DetailCell>{'Receiver'}</DetailCell>
        <DetailCell>{'ENS Name'}</DetailCell>
      </DetailHeader>

      <DetailRow>
        <DetailCell>
          <Segment>
            <Avatar defaultSeed={parsedData?.to[0]} src={imageUrl} size={24} />
          </Segment>
          <Segment>{ensName || shortenAddress(parsedData?.to[0])}</Segment>
        </DetailCell>
        <DetailCell>{'kenny.eth'}</DetailCell>
      </DetailRow>
    </>
  );
};

export default UpdateENSNameSummary;
