import Filter from './Filter';
import { render } from 'utils/tests';
import { BigNumber } from 'ethers';
const bn = (value: number) => BigNumber.from(value);

jest.mock('contexts/Guilds/filters', () => ({
  useFilter: () => {
    return {
      totalFilters: 1,
      onToggleState: jest.fn(),
      onResetState: jest.fn(),
      isStateSelected: jest.fn(),
      countStateSelected: jest.fn(),
      onToggleType: jest.fn(),
      onResetType: jest.fn(),
      isTypeSelected: jest.fn(),
      countTypeSelected: jest.fn(),
      onToggleCurrency: jest.fn(),
      onResetCurrency: jest.fn(),
      isCurrencySelected: jest.fn(),
      countCurrencySelected: jest.fn(),
    };
  },
}));
jest.mock('hooks/Guilds/ether-swr/guild/useVotingPowerOf', () => ({
  useVotingPowerOf: () => ({
    data: bn(10000),
  }),
}));
jest.mock('hooks/Guilds/ether-swr/guild/useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      name: 'REPGuild',
      token: '0x0000000000000000000000000000000000000000',
      permissionRegistry: '0x0000000000000000000000000000000000000000',
      proposalTime: bn(10000),
      timeForExecution: bn(100002),
      maxActiveProposals: bn(1000330),
      votingPowerForProposalCreation: bn(1000022),
      votingPowerForProposalExecution: bn(10044400),
      tokenVault: '0x0000000000000000000000000000000000000000',
      lockTime: bn(1004440022),
      totalLocked: bn(200),
    },
  }),
}));

describe('Filter', () => {
  it.skip('Should match snapshot', () => {
    const { container } = render(<Filter />);
    expect(container).toMatchSnapshot();
  });
});
