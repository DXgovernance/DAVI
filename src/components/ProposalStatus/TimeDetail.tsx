import { TimeDetailProps } from './types';

export const TimeDetail: React.FC<TimeDetailProps> = ({ endTime }) => {
  return (
    <span title={endTime.moment?.format('MMMM Do, YYYY - h:mm a')}>
      {endTime.detail}
    </span>
  );
};
