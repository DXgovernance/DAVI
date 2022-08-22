import { render } from 'utils/tests';
import UpdateENSContentEditor from './UpdateENSContentEditor';
import { mockDecodedCallUpdateENSContent } from './fixtures';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useNetwork: () => ({
    chain: {
      id: 1,
    },
  }),
}));

describe('UpdateENSContentEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <UpdateENSContentEditor
        decodedCall={mockDecodedCallUpdateENSContent}
        updateCall={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
