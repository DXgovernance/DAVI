import useENSNameFromAddress from './useENSNameFromAddress';

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: 'wagmi.eth',
    isError: false,
    isLoading: false,
  }),
}));

describe('useAddressFromENSName', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the address from the ens name', () => {
    const { ensName, isError, isLoading } = useENSNameFromAddress(
      '0x0000000000000000000000000000000000000000'
    );
    expect(ensName).toBe('wagmi.eth');
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
