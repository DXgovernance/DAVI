import useENSResolver from './useENSResolver';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from './fixtures';

jest.mock('wagmi', () => ({
  useEnsResolver: () => ({
    data: {
      address: MOCK_ADDRESS,
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
    const { resolver, isError, isLoading } = useENSResolver(MOCK_ENS_NAME);
    expect(resolver.address).toMatchInlineSnapshot(
      `"0x0000000000000000000000000000000000000000"`
    );
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
