import useENSResolver from './useENSResolver';

jest.mock('wagmi', () => ({
  useEnsResolver: () => ({
    data: {
      address: '0x0000000000000000000000000000000000000000',
    },
    isError: false,
    isLoading: false,
  }),
}));

describe('useAddressFromENSName', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the resolver address from the ens name', () => {
    const { resolver, isError, isLoading } = useENSResolver('wagmi.eth');
    expect(resolver.address).toMatchInlineSnapshot(
      `"0x0000000000000000000000000000000000000000"`
    );
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
