import { render } from '../../../../utils/tests';
import { ProposalOptionTag } from './ProposalOptionTag';

describe('ProposalOptionTag', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <ProposalOptionTag option={{ id: 'for', label: 'For', color: '#000' }} />
    );
    expect(container).toMatchSnapshot();
  });
});
