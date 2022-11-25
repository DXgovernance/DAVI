import { renderHook } from '@testing-library/react-hooks';
import { mockChain } from 'components/Web3Modals/fixtures';
import {
  IPFSRichContractData,
  useRichContractRegistry,
} from './useRichContractRegistry';

const mockChainId = 123456;
const contractAddress = '0x0000000000000000000000000000000000000001';
const mockRichContractData: IPFSRichContractData[] = [
  {
    title: 'RichDataMockContract',
    tags: [],
    networks: { [mockChainId]: contractAddress },
    functions: [],
  },
];

jest.mock('hooks/Guilds/ipfs/useIPFSFile', () => ({
  __esModule: true,
  default: () => ({
    data: mockRichContractData,
  }),
}));

jest.mock('wagmi', () => ({
  useContractRead: () => ({ data: '' }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
  useNetwork: () => ({ chain: mockChain }),
}));

describe('useRichContractRegistry', () => {
  it('should return correct contract data', async () => {
    const { result } = renderHook(() => useRichContractRegistry());

    expect(result.current.contracts).not.toBe(null);
    expect(result.current.contracts.length).toBe(1);
    expect(result.current.contracts[0].contractAddress).toBe(contractAddress);
  });
});
