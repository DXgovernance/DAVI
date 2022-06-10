import StakeTokensModal from './StakeTokensModal';
import { render } from '../../utils/tests';
import { mockStakeTokensModalProps } from './fixture';

jest.mock('ipfs', () => jest.fn());
jest.mock('cids', () => jest.fn());
jest.mock('orbit-db', () => jest.fn());
jest.mock('ipfs-only-hash', () => jest.fn());

describe('StakeTokensModal', () => {
  it('StakeTokensModal renders properly', () => {
    const { container } = render(
      <StakeTokensModal {...mockStakeTokensModalProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
