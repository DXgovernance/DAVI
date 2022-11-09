import moment, { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import { ProposalState } from 'types/types.guilds.d';
import {
  getTimeDifferenceHumanized,
  isBeforeCurrentTime,
} from 'utils/time/time';
import { useGuildConfig } from './useGuildConfig';

const useTimeDetail = (
  guildId: string,
  status: ProposalState,
  endTime: Moment
) => {
  const { t } = useTranslation();
  const { data: guildConfig } = useGuildConfig(guildId);

  let endTimeDetail: string = null;
  let endTimeMoment: Moment = null;

  // with states Executable and Failed we show the time difference with execution time. Otherwise, with ending time
  if (status === ProposalState.Executable || status === ProposalState.Failed) {
    endTimeMoment = moment(endTime).add(
      guildConfig?.timeForExecution.toNumber(),
      'seconds'
    );

    const timeDifferenceHumanized = getTimeDifferenceHumanized(endTimeMoment);

    endTimeDetail = isBeforeCurrentTime(endTimeMoment)
      ? t('expiredTimeAgo', { timeDifferenceHumanized })
      : t('expiresInTimeDetail', { timeDifferenceHumanized });
  } else {
    const timeDifferenceHumanized = getTimeDifferenceHumanized(endTime);

    endTimeDetail = isBeforeCurrentTime(endTime)
      ? t('endedTimeAgo', { timeDifferenceHumanized })
      : t('endingTimeLeft', { timeDifferenceHumanized });
    endTimeMoment = endTime;
  }

  return { detail: endTimeDetail, moment: endTimeMoment };
};

export default useTimeDetail;
