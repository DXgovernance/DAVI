import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ProposalState } from 'types/types.guilds.d';
import {
  getTimeDifferenceFromCurrentTimeHumanized,
  isBeforeCurrentTime,
} from 'utils/time/time';
import { useGuildConfig } from './useGuildConfig';

const useTimeDetail = (
  guildId: string,
  status: ProposalState,
  endTime: moment.Moment
) => {
  const { t } = useTranslation();
  const { data: guildConfig } = useGuildConfig(guildId);

  let endTimeDetail = null;
  let endTimeMoment = null;

  if (!endTime) return { endTimeMoment, endTimeDetail };

  // with states Executable and Failed we show the time difference with execution time. Otherwise, with ending time
  if (
    guildConfig &&
    (status === ProposalState.Executable || status === ProposalState.Failed)
  ) {
    const { timeForExecution } = guildConfig;

    endTimeMoment = moment(endTime).add(timeForExecution.toNumber(), 'seconds');

    const timeDifferenceHumanized =
      getTimeDifferenceFromCurrentTimeHumanized(endTimeMoment);

    endTimeDetail = isBeforeCurrentTime(endTimeMoment)
      ? t('expiredTimeAgo', { timeDifferenceHumanized })
      : t('expiresInTimeDetail', { timeDifferenceHumanized });
  } else {
    const timeDifferenceHumanized =
      getTimeDifferenceFromCurrentTimeHumanized(endTime);

    endTimeDetail = isBeforeCurrentTime(endTime)
      ? t('endedTimeAgo', { timeDifferenceHumanized })
      : t('endingTimeLeft', { timeDifferenceHumanized });
    endTimeMoment = endTime;
  }

  return { endTimeMoment, endTimeDetail };
};

export default useTimeDetail;
