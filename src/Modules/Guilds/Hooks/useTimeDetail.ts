import moment, { unix } from 'moment';
import { useTranslation } from 'react-i18next';
import { ProposalState } from 'types/types.guilds.d';
import { getTimeDetail } from 'utils/timeDetail';
import { useGuildConfig } from './useGuildConfig';

const useTimeDetail = (
  guildId: string,
  status: ProposalState,
  endTime: moment.Moment
) => {
  const { t } = useTranslation();
  const { data: guildConfig } = useGuildConfig(guildId);

  let endTimeDetail = '';
  let endTimeMoment: moment.Moment;

  if (
    guildConfig &&
    (status === ProposalState.Executable || status === ProposalState.Failed)
  ) {
    const { timeForExecution } = guildConfig;

    const timeForExecutionUnix = unix(timeForExecution.toNumber());
    endTimeMoment = moment(endTime).add(timeForExecutionUnix.toString());

    const { isBefore, timeDetailHumanized } = getTimeDetail(endTimeMoment);

    endTimeDetail = isBefore
      ? t('expiredTimeAgo', { timeDetailHumanized })
      : t('expiresInTimeDetail', { timeDetailHumanized });
  } else {
    const { isBefore, timeDetailHumanized } = getTimeDetail(endTime);
    endTimeDetail = isBefore
      ? t('endedTimeAgo', { timeDetailHumanized })
      : t('endingLeftTime', { timeDetailHumanized });
    endTimeMoment = endTime;
  }

  return { endTimeMoment, endTimeDetail };
};

export default useTimeDetail;
