import { render } from 'utils/tests';
import { CallDetails } from './CallDetails';
import {
  approvetokenSpendingMock,
  decodedCallMock,
  emptyDecodedCallMock,
} from './fixtures';

describe('CallDetails', () => {
  it('Should match', () => {
    const { container } = render(<CallDetails decodedCall={decodedCallMock} />);
    expect(container).toMatchSnapshot();
  });

  it('Should match with empty data', () => {
    const { container } = render(
      <CallDetails
        decodedCall={emptyDecodedCallMock}
        approveSpendTokens={approvetokenSpendingMock}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
