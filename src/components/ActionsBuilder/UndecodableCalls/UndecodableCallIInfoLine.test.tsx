import { MOCK_ADDRESS } from 'hooks/Guilds/ens/fixtures';
import { render } from 'utils/tests';
import { callMock } from './fixtures';
import UndecodableCallInfoLine from './UndecodableCallInfoLine';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsName: () => ({
    data: MOCK_ADDRESS,
    isLoading: false,
    isError: false,
  }),
  useEnsAddress: () => ({
    data: MOCK_ADDRESS,
    isLoading: false,
    isError: false,
  }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useContractReads: () => ({
    data: [{}],
  }),
  useNetwork: () => ({
    chain: {
      id: 1,
      blockExplorers: {
        default: {
          url: 'https://etherscan.io',
        },
      },
    },
  }),
}));

describe('UndecodableCallInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UndecodableCallInfoLine call={callMock} />);
    expect(container).toMatchSnapshot();
  });
});
