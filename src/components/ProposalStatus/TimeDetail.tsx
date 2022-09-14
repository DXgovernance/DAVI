import { TimeDetailProps } from './types';
import useTimeDetail from 'Modules/Guilds/Hooks/useTimeDetail';

export const TimeDetail: React.FC<TimeDetailProps> = ({
  endTime,
  status,
  guildId,
}) => {
  const { endTimeMoment, endTimeDetail } = useTimeDetail(
    guildId,
    status,
    endTime
  );

  return (
    <span title={endTimeMoment?.format('MMMM Do, YYYY - h:mm a')}>
      {endTimeDetail}
    </span>
  );
};
