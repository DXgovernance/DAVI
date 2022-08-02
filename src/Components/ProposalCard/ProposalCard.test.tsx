import ProposalCard from 'Components/ProposalCard/ProposalCard';
import { render } from '../../utils/tests';
import { ProposalCardProps } from 'Components/ProposalCard/types';
import {
  ensAvatarMock,
  proposalMock,
  proposalStatusPropsMock,
} from '../Fixtures';

jest.mock('ipfs', () => jest.fn());
jest.mock('cids', () => jest.fn());
jest.mock('axios', () => jest.fn());
jest.mock('hooks/Guilds/guild/useProposalSummaryActions', () => {
  return {
    useProposalSummaryActions: jest.fn(),
  };
});

const validProps: ProposalCardProps = {
  proposal: proposalMock,
  ensAvatar: ensAvatarMock,
  href: 'testUrl',
  statusProps: proposalStatusPropsMock,
};

const invalidProps: ProposalCardProps = {
  proposal: null,
  ensAvatar: null,
  href: null,
  statusProps: {
    timeDetail: null,
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
  it('ProposalCard loading', () => {
    const { container } = render(<ProposalCard {...invalidProps} />);
    expect(container).toMatchSnapshot();
  });
});
