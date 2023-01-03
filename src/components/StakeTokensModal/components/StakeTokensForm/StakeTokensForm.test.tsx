import StakeTokensForm from './StakeTokensForm';
import { render } from 'utils/tests';
import { mockStakeTokensFormProps } from '../../fixture';

jest.mock('ipfs', () => jest.fn());
jest.mock('cids', () => jest.fn());
jest.mock('ipfs-only-hash', () => jest.fn());

jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: {
      writers: {
        useLockTokens: jest.fn(),
        useApproveTokens: jest.fn(),
      },
    },
  }),
}));

describe('StakeTokensForm', () => {
  it('StakeTokensForm renders properly', () => {
    const { container } = render(
      <StakeTokensForm {...mockStakeTokensFormProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
