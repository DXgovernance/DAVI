import TokenPicker from './TokenPicker';
import { render } from 'utils/tests';
import { useAllERC20Balances } from 'hooks/Guilds/erc20/useAllERC20Balances';
import { data } from './fixtures';
import { ZERO_ADDRESS } from 'utils';

jest.mock('hooks/Guilds/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: jest.fn(),
}));

const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  useAccount: () => ({ address: mockAddress }),
}));

const mockedERC20Balances = useAllERC20Balances as jest.Mock;

describe('TokenPicker', () => {
  let props;
  beforeEach(() => {
    props = {
      isOpen: true,
      onClose: jest.fn(),
      onSelect: () => jest.fn(),
    };
  });

  it('Should match snapshot', () => {
    console.error = jest.fn();

    mockedERC20Balances.mockImplementation(() => ({
      data,
    }));

    const { container } = render(<TokenPicker {...props} />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
  });
});
