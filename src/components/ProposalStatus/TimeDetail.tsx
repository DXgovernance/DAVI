import { TimeDetailProps } from './types';
// import useTimeDetail from 'Modules/Guilds/Hooks/useTimeDetail';

export const TimeDetail: React.FC<TimeDetailProps> = ({
  endTimeMoment,
  endTimeDetail,
}) => {
  return (
    <span title={endTimeMoment?.format('MMMM Do, YYYY - h:mm a')}>
      {endTimeDetail}
    </span>
  );
};
