import { MOCK_GUILD_ADDRESS } from 'Modules/Guilds/Hooks/fixtures';
import { ProposalState } from 'types/types.guilds.d';
import useTimeDetail from './useTimeDetail';
import moment from 'moment';
import { BigNumber } from 'ethers';
const bn = (value: number) => BigNumber.from(value);

jest.mock('Modules/Guilds/Hooks/useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      timeForExecution: bn(100002),
    },
  }),
}));

describe('useTimeDetail', () => {
  it('should return expiresInTimeDetail when state is Executable and end time is after current moment', () => {
    const dateAfterCurrent = moment().add(1, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Executable,
      dateAfterCurrent
    );
    expect(endTimeDetail).toBe('expiresInTimeDetail');
  });

  it('should return expiredTimeAgo ago when state is Executable and end time is before current moment', () => {
    const dateBeforeCurrent = moment().subtract(3, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Executable,
      dateBeforeCurrent
    );
    expect(endTimeDetail).toBe('expiredTimeAgo');
  });

  it('should return expiresInTimeDetail when state is Failed and end time is after current moment', () => {
    const dateAfterCurrent = moment().add(1, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Failed,
      dateAfterCurrent
    );
    expect(endTimeDetail).toBe('expiresInTimeDetail');
  });

  it('should return expiredTimeAgo when state is Failed and end time is before current moment', () => {
    const dateBeforeCurrent = moment().subtract(3, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Failed,
      dateBeforeCurrent
    );
    expect(endTimeDetail).toBe('expiredTimeAgo');
  });

  it('should return endingTimeLeft left when state is not Executable nor Failed and end time is after current moment', () => {
    const dateAfterCurrent = moment().add(1, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Active,
      dateAfterCurrent
    );
    expect(endTimeDetail).toBe('endingTimeLeft');
  });

  it('should return endedTimeAgo when state is not Executable nor Failed and end time is before current moment', () => {
    const dateBeforeCurrent = moment().subtract(1, 'day');

    const { endTimeDetail } = useTimeDetail(
      MOCK_GUILD_ADDRESS,
      ProposalState.Executed,
      dateBeforeCurrent
    );
    expect(endTimeDetail).toBe('endedTimeAgo');
  });
});
