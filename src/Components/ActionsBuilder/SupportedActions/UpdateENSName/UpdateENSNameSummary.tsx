import { DetailBody, DetailHeader, DetailRow } from '../common/Summary.styled';
import { Segment } from '../common/infoLine';
import Summary from '../common/Summary';

const UpdateENSNameSummary = ({ decodedCall }) => {
  const parsedData = {
    to: '0x0000000000000000000000000000000000000000',
  };

  // Get nameHash from decodedCall
  // Use hook to call Public Resolver method to get canonical name
  // Do we need to show the value in the summary in case you could get a malicious user that would try and interact?
  return (
    <>
      <DetailHeader>{'ENS Name:'}</DetailHeader>

      <DetailRow>
        <DetailBody>
          <Segment>{'kenny.eth' || ''}</Segment>
        </DetailBody>
      </DetailRow>

      <DetailHeader>{'IPFS Hash:'}</DetailHeader>

      <DetailRow>
        <DetailBody>
          <Segment>{parsedData.to || ''}</Segment>
        </DetailBody>
      </DetailRow>
      <Summary decodedCall={decodedCall} address={parsedData?.to} />
    </>
  );
};

export default UpdateENSNameSummary;

// kenny.eth --> 0x0000000000000000000000000000000000000000

// nameHash/node --> kenny.eth

// address --> ANY_ADDRESS

// resolverAdress --> ANY_OTHER_ADDRESS

// contentHash --> ANY_HASH

// QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4
