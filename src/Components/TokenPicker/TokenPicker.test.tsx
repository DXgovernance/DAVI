import TokenPicker from './TokenPicker';
import { render } from 'utils/tests';
import { useAllERC20Balances } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';
import { data } from './fixtures';

jest.mock('hooks/Guilds/ether-swr/erc20/useAllERC20Balances', () => ({
  useAllERC20Balances: jest.fn(),
}));

jest.mock('contexts/index', () => jest.fn());

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
