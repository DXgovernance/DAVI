import { useVoterLockTimestamp } from 'Modules/Guilds/Hooks/useVoterLockTimestamp';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_USER_ADDRESS,
  MOCK_BIG_NUMBER,
} from 'Modules/Guilds/Hooks/fixtures';

jest.mock('Modules/Guilds/Hooks/useVoterLockTimestamp', () => {
  const moment = require('moment');
  return {
    useVoterLockTimestamp: () => ({
      data: moment.unix(Number(MOCK_BIG_NUMBER)),
      isError: false,
      isLoading: false,
    }),
  };
});

describe('useVoterLockTimestamp', () => {
  it('should return the timestamp of voter tokens', () => {
    const { data, isError, isLoading } = useVoterLockTimestamp(
      MOCK_CONTRACT_ADDRESS,
      MOCK_USER_ADDRESS
    );
    expect(data).toMatchInlineSnapshot(`"1970-01-01T00:00:01.000Z"`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
