import { ProposalState } from 'types/types.guilds.d';
import { TimeDetailProps } from './types';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { getTimeDetail } from '../../utils/timeDetail';
import { unix } from 'moment';
import moment from 'moment';

export const TimeDetail: React.FC<TimeDetailProps> = ({
  endTime,
  timeDetail,
  status,
  guildId,
}) => {
  const { data: guildConfig } = useGuildConfig(guildId);

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

  const { timeForExecution } = guildConfig;
  let executionTimeDetail = '';

  const timeForExecutionUnix = unix(timeForExecution.toNumber());
  const executionTimeMoment = moment(endTime).add(
    timeForExecutionUnix.toString()
  );

  const { isBefore, timeDetailHumanize } = getTimeDetail(executionTimeMoment);

  executionTimeDetail = isBefore
    ? `expired ${timeDetailHumanize} ago`
    : `expires in ${timeDetailHumanize}`;

  if (status === ProposalState.Executable || status === ProposalState.Failed) {
    return (
      <span title={executionTimeMoment?.format('MMMM Do, YYYY - h:mm a')}>
        {executionTimeDetail}
      </span>
    );
  }

  return null;
};
