import useAddressFromENSName from './useAddressFromENSName';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from './fixtures';

jest.mock('wagmi', () => ({
  useEnsAddress: () => ({
    data: MOCK_ADDRESS,
    isError: false,
    isLoading: false,
  }),
}));

describe('useAddressFromENSName', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the address from the ens name', () => {
    const { ensAddress, isError, isLoading } =
      useAddressFromENSName(MOCK_ENS_NAME);
    expect(ensAddress).toBe(MOCK_ADDRESS);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
