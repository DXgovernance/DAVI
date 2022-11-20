import { ProposalCard, ProposalCardProps } from 'components/ProposalCard';
import { render } from '../../utils/tests';
import {
  ensAvatarMock,
  optionsMock,
  optionsWithSeveralActionsMock,
  proposalMock,
  proposalStatusPropsMock,
} from 'utils/fixtures';
import { BigNumber } from 'ethers';
import { mockChain } from 'components/Web3Modals/fixtures';

jest.mock('Modules/Guilds/Hooks/useGuildConfig', () => ({
  useGuildConfig: () => jest.fn(),
}));

const mockBigNumber = BigNumber.from(100000000);

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

jest.mock('hooks/Guilds/erc20/useERC20Info', () => ({
  useERC20Info: () => ({
    name: 'Test ERC20',
    symbol: 'TEST',
    decimals: 18,
    totalSupply: mockBigNumber,
  }),
}));

jest.mock('wagmi', () => ({
  chain: {},
  useContractRead: () => ({ data: '' }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
}));

const validProps: ProposalCardProps = {
  proposal: proposalMock,
  ensAvatar: ensAvatarMock,
  href: 'testUrl',
  statusProps: proposalStatusPropsMock,
  options: [optionsMock],
};

const invalidProps: ProposalCardProps = {
  proposal: null,
  ensAvatar: null,
  href: null,
  statusProps: {
    status: null,
    endTime: null,
  },
  options: null,
};
describe('ProposalCard', () => {
  it('ProposalCard Renders properly with data', () => {
    const { container } = render(<ProposalCard {...validProps} />);
    expect(container).toMatchSnapshot();
  });

  it('ProposalCard Renders properly with more than one option ', () => {
    const propsWithMoreThanOneOption = {
      ...validProps,
      options: [optionsMock, optionsMock],
    };

    const { container } = render(
      <ProposalCard {...propsWithMoreThanOneOption} />
    );
    expect(container).toMatchSnapshot();
  });

  it('ProposalCard Renders properly with more than one option containing more than one action', () => {
    let optionWithSeveralActions = {
      ...validProps,
      options: [optionsWithSeveralActionsMock],
    };

    const { container } = render(
      <ProposalCard {...optionWithSeveralActions} />
    );
    expect(container).toMatchSnapshot();
  });

  it('ProposalCard loading', () => {
    const { container } = render(<ProposalCard {...invalidProps} />);
    expect(container).toMatchSnapshot();
  });
});
