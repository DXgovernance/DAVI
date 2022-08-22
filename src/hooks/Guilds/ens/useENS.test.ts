import useENS from './useENS';

jest.mock('./useENS');
const mockUseENS = useENS as unknown as jest.Mock<ReturnType<typeof useENS>>;

describe('useENS', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return the resolved ens name', () => {
    const mockEnsName = 'wagmi.eth';
    mockUseENS.mockImplementationOnce(() => {
      return {
        address: '',
        name: mockEnsName,
      };
    });
    const { address, name } = useENS(mockEnsName);
    expect(address).toBe('');
    expect(name).toBe(mockEnsName);
  });

  it('should return a valid address', () => {
    const mockAddress = '0x0000000000000000000000000000000000000000';
    mockUseENS.mockImplementationOnce(() => {
      return {
        address: mockAddress,
        name: '',
      };
    });
    const { address, name } = useENS(mockAddress);
    expect(address).toBe(mockAddress);
    expect(name).toBe('');
  });
});
