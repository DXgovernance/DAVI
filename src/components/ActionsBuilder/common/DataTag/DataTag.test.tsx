import { render } from 'utils/tests';
import { DataTag } from './DataTag';

describe('AddButton', () => {
  it('Should match snapshot', () => {
    const { container } = render(<DataTag>Test</DataTag>);
    expect(container).toMatchSnapshot();
  });
});
