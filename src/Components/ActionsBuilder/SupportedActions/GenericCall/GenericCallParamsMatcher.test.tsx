/* eslint-disable no-template-curly-in-string */
import { BigNumber } from 'ethers';
import GenericCallParamsMatcher from './GenericCallParamsMatcher';
import { FunctionParamWithValue } from './GenericCallInfoLine';
import { render } from 'utils/tests';

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

describe('GenericCallParamsMatcher', () => {
  const paramDefaults: Omit<
    FunctionParamWithValue,
    'name' | 'component' | 'value'
  > = {
    type: 'test',
    description: 'test',
    defaultValue: '',
  };

  const params = [
    {
      ...paramDefaults,
      name: 'addressParam',
      component: 'address',
      value: '0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
    },
    {
      ...paramDefaults,
      name: 'integerParam',
      component: 'integer',
      value: '1000000000000000000',
    },
    {
      ...paramDefaults,
      name: 'decimalParam',
      component: 'decimal',
      value: '1',
    },
    {
      ...paramDefaults,
      name: 'dateParam',
      component: 'date',
      value: '1653848238',
    },
    {
      ...paramDefaults,
      name: 'timeParam',
      component: 'time',
      value: '1653848238',
    },
    {
      ...paramDefaults,
      name: 'booleanParam',
      component: 'boolean',
      value: 'false',
    },
    {
      ...paramDefaults,
      name: 'tokenAmountParam',
      component: 'tokenAmount',
      value: '1000000000000000000',
    },
    {
      ...paramDefaults,
      name: 'contentHashParam',
      component: 'contentHash',
      value: 'QmXk294ZQebU6J7yYpAhBqBPaMquCKxGmGoNHLBpvUJ9on',
    },
    {
      ...paramDefaults,
      name: 'otherParam',
      component: 'other',
      value: 'Test String',
    },
  ];

  const matcher = new GenericCallParamsMatcher('testMatcher', {
    params,
  });

  it('matches rich contract data template', () => {
    const match = matcher.match('Test: ${param1}: Test');
    expect(match).not.toBeNull();
    expect(match).toEqual({
      index: 6,
      length: 9,
      match: '${param1}',
      valid: true,
      matchedParam: 'param1',
    });
  });

  it('does not return a match without without template', () => {
    const match = matcher.match('Test: {param1}');
    expect(match).toBeNull();
  });

  it('renders all component types correctly', () => {
    params.forEach(param => {
      const { container } = render(matcher.renderByParamType(param));
      expect(container).toMatchSnapshot();
    });
  });

  it('replaces all component types correctly', () => {
    params.forEach(param => {
      const { container } = render(
        matcher.replaceWith(null, { matchedParam: param.name })
      );
      expect(container).toMatchSnapshot();
    });
  });
});
