import useENSNameFromAddress from './useENSNameFromAddress';
import { MOCK_ENS_NAME, MOCK_ADDRESS } from './fixtures';

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: MOCK_ENS_NAME,
    isError: false,
    isLoading: false,
  }),
}));

describe('useAddressFromENSName', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the address from the ens name', () => {
    const { ensName, isError, isLoading } = useENSNameFromAddress(MOCK_ADDRESS);
    expect(ensName).toBe(MOCK_ENS_NAME);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
