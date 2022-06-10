import { render } from '../../../../../utils/tests';
import { ProposalOptionTag } from './ProposalOptionTag';

jest.mock('contexts/index', () => jest.fn());

describe('ProposalOptionTag', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <ProposalOptionTag option={{ id: '0', label: 'For', color: 'blue' }} />
    );
    expect(container).toMatchSnapshot();
  });
});
