import { render } from 'utils/tests';
import { callMock, callMockWithApproval } from './fixtures';
import UndecodableCallDetails from './UndecodableCallDetails';

describe('UndecodableCallDetails', () => {
  it('Should match snapshot', () => {
    const { container } = render(<UndecodableCallDetails call={callMock} />);
    expect(container).toMatchSnapshot();
  });
  it('Should match snapshot with approval call', () => {
    const { container } = render(
      <UndecodableCallDetails call={callMockWithApproval} />
    );
    expect(container).toMatchSnapshot();
  });
});
