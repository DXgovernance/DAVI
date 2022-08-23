import useAddressFromENSName from './useAddressFromENSName';

jest.mock('wagmi', () => ({
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
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
      useAddressFromENSName('wagmi.eth');
    expect(ensAddress).toBe('0x0000000000000000000000000000000000000000');
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
