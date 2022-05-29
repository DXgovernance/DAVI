import { BigNumber } from 'ethers';
import { render } from '../../../../utils/tests';
import { approvetokenSpendingMock, genericDecodedCallMock } from './fixtures';
import GenericCallInfoLine from './GenericCallInfoLine';
import { RichContractFunction } from 'hooks/Guilds/contracts/useRichContractRegistry';

jest.mock('hooks/Guilds/contracts/useRichContractData', () => ({
  __esModule: true,
  default: (): { functionData: RichContractFunction } => ({
    functionData: {
      title: 'Test Function',
      functionName: 'TestFunction',
      shortDescription: 'Test function description',
      longDescription: 'This is a long description for this test function.',
      params: [
        {
          name: 'param1',
          type: 'uint256',
          component: 'TestComponent',
          description: 'Test parameter 1',
          defaultValue: '',
        },
        {
          name: 'param2',
          type: 'int256',
          component: 'TestComponent',
          description: 'Test parameter 2',
          defaultValue: '',
        },
        {
          name: 'param3',
          type: 'address',
          component: 'TestComponent',
          description: 'Test parameter 3',
          defaultValue: '',
        },
      ],
      // eslint-disable-next-line no-template-curly-in-string
      templateLiteral: 'Test template ${param1} ${param2} ${param3}',
      spendsTokens: true,
    },
  }),
}));

jest.mock('hooks/Guilds/ether-swr/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

const mockBigNumber = BigNumber.from(100000000);
jest.mock('hooks/Guilds/ether-swr/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

describe('GenericCallInfoLine', () => {
  it('renders properly', () => {
    const { container } = render(
      <GenericCallInfoLine decodedCall={genericDecodedCallMock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders properly in compact mode', () => {
    const { container } = render(
      <GenericCallInfoLine decodedCall={genericDecodedCallMock} compact />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders properly with token approval', () => {
    const { container } = render(
      <GenericCallInfoLine
        decodedCall={genericDecodedCallMock}
        approveSpendTokens={approvetokenSpendingMock}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
