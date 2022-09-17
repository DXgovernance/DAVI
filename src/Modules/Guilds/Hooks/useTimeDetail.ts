import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ProposalState } from 'types/types.guilds.d';
import { getTimeDetail, isBeforeCurrentTime } from 'utils/time/time';
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

  // with states Executable and Failed we show the time difference with execution time. Otherwise, with ending time
  if (
    guildConfig &&
    (status === ProposalState.Executable || status === ProposalState.Failed)
  ) {
    const { timeForExecution } = guildConfig;

    endTimeMoment = moment(endTime).add(timeForExecution.toNumber(), 'seconds');

    const timeDetailHumanized = getTimeDetail(endTimeMoment);

    endTimeDetail = isBeforeCurrentTime(endTimeMoment)
      ? t('expiredTimeAgo', { timeDetailHumanized })
      : t('expiresInTimeDetail', { timeDetailHumanized });
  } else {
    const timeDetailHumanized = getTimeDetail(endTime);

    endTimeDetail = isBeforeCurrentTime(endTime)
      ? t('endedTimeAgo', { timeDetailHumanized })
      : t('endingTimeLeft', { timeDetailHumanized });
    endTimeMoment = endTime;
  }

  return { endTimeMoment, endTimeDetail };
};

export default useTimeDetail;
