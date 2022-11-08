import { render } from 'utils/tests';
import {
  callMock,
  callMockWithApproval,
  MOCK_ADDRESS,
  MOCK_ENS_NAME,
} from './fixtures';
import UndecodableCallDetails from './UndecodableCallDetails';

jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: 1 } }),
  chain: {
    mainnet: {},
  },
  useEnsAddress: () => ({
    data: MOCK_ADDRESS,
  }),
  useEnsName: () => ({
    data: MOCK_ENS_NAME,
  }),
  useEnsResolver: () => ({
    data: {
      name: MOCK_ENS_NAME,
      address: MOCK_ADDRESS,
    },
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useContractReads: () => ({
    data: [{}],
  }),
}));

describe('UndecodableCallDetails', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UndecodableCallDetails call={callMock} />);
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot with approval call', () => {
    const { container } = render(
      <UndecodableCallDetails call={callMockWithApproval} />
    );
    expect(container).toMatchSnapshot();
  });
});
