import { Segment } from '../common/infoLine';
import { FiArrowRight, FiNavigation } from 'react-icons/fi';

const UpdateENSNameInfoLine = ({ decodedCall }) => {
  console.log({ decodedCall });
  // Get nameHash from decodedCall
  // Use hook to call Public Resolver method to get canonical name

  return (
    <>
      <Segment>
        <FiNavigation size={16} />
      </Segment>
      <Segment>{'kenny.eth'}</Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      <Segment>{'QmRAQB6YaCyidP37U...cqdyoW1CuDgwxkD4'}</Segment>
    </>
  );
};

export default UpdateENSNameInfoLine;
