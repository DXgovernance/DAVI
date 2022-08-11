import { render } from 'utils/tests';
import { DiffView } from './DiffView';
import { mockCodeOriginal, mockCodeUpdated } from './fixtures';

describe('DiffView', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <DiffView oldCode={mockCodeOriginal} newCode={mockCodeUpdated} />
    );
    expect(container).toMatchSnapshot();
  });
});
