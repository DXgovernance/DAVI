import { render } from 'utils/tests';
import { callMock, callMockWithApproval } from './fixtures';
import UndecodableCallDetails from './UndecodableCallDetails';

describe('UndecodableCallDetails', () => {
  it('renders', () => {
    const { container } = render(<UndecodableCallDetails call={callMock} />);
    expect(container).toMatchSnapshot();
  });
  it('renders with approval call', () => {
    const { container } = render(
      <UndecodableCallDetails call={callMockWithApproval} />
    );
    expect(container).toMatchSnapshot();
  });
});
