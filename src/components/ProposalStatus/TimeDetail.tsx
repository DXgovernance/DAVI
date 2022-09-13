import { ProposalState } from 'types/types.guilds.d';
import { TimeDetailProps } from './types';
import moment, { unix } from 'moment';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';

export const TimeDetail: React.FC<TimeDetailProps> = ({
  endTime,
  timeDetail,
  status,
  guildId,
}) => {
  const { data: guildConfig } = useGuildConfig(guildId);
  const ONE_MINUTE = 60000;

  if (
    !guildConfig ||
    status === ProposalState.Active ||
    status === ProposalState.Executed
  ) {
    return (
      <span title={endTime?.format('MMMM Do, YYYY - h:mm a')}>
        {timeDetail}
      </span>
    );
  }

  let { timeForExecution }: any = guildConfig;
  let executionTimeDetail = '';

  timeForExecution = unix(timeForExecution.toNumber());
  const executionTime = moment(endTime).add(timeForExecution);
  const currentTime = moment();
  let differenceInMilliseconds = currentTime.diff(executionTime);
  let timeDifference =
    Math.abs(differenceInMilliseconds) >= ONE_MINUTE
      ? moment.duration(differenceInMilliseconds).humanize()
      : 'a few seconds';

  if (executionTime.isBefore(currentTime)) {
    executionTimeDetail = `expired ${timeDifference} ago`;
  } else {
    executionTimeDetail = `expires in ${timeDifference}`;
  }

  if (status === ProposalState.Executable || status === ProposalState.Failed) {
    return (
      <span title={executionTime?.format('MMMM Do, YYYY - h:mm a')}>
        {executionTimeDetail}
      </span>
    );
  } else return null;
};
