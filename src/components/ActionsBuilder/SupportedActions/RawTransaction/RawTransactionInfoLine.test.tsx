import { rawDataCallMock } from './fixtures';
import RawTransactionInfoLine from './RawTransactionInfoLine';
import { render } from 'utils/tests';
import { BigNumber } from 'ethers';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsResolver: () => ({
    data: {
      name: MOCK_ENS_NAME,
      address: MOCK_ADDRESS,
    },
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
  useEnsName: () => ({
    data: MOCK_ENS_NAME,
  }),
  useEnsAddress: () => ({
    data: MOCK_ADDRESS,
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useProvider: () => ({
    getNetwork: jest.fn(),
  }),
  chain: {
    mainnet: {},
  },
  useContractReads: () => ({
    data: [{}],
  }),
  chainId: {
    localhost: 1337,
  },
}));

describe('RawTransactionInfoLine', () => {
  it('should match snapshot with full data', () => {
    const { container } = render(
      <RawTransactionInfoLine decodedCall={rawDataCallMock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with no value', () => {
    const data = { ...rawDataCallMock, value: BigNumber.from(0) };
    const { container } = render(<RawTransactionInfoLine decodedCall={data} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with no data', () => {
    const data = { ...rawDataCallMock, optionalProps: { data: '0x00' } };
    const { container } = render(<RawTransactionInfoLine decodedCall={data} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot in compact mode', () => {
    const { container } = render(
      <RawTransactionInfoLine decodedCall={rawDataCallMock} compact />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot in noAvatar mode', () => {
    const { container } = render(
      <RawTransactionInfoLine decodedCall={rawDataCallMock} noAvatar />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot in noAvatar and compact mode', () => {
    const { container } = render(
      <RawTransactionInfoLine decodedCall={rawDataCallMock} compact noAvatar />
    );
    expect(container).toMatchSnapshot();
  });
});
