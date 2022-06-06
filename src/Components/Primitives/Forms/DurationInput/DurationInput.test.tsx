import DurationInput from './DurationInput';
import { render } from 'utils/tests';
import { defaultProps } from './fixtures';
import { fireEvent } from '@testing-library/react';
// import { fireEvent } from '@testing-library/user-event';

describe('Duration Input', () => {
  it('Should render an input', () => {
    const { container } = render(<DurationInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should open the duration input picker when clicked', () => {
    const { getByRole, getByText } = render(
      <DurationInput {...defaultProps} />
    );
    const inputElement = getByRole('input-modal');
    fireEvent.click(inputElement);
    const headerElement = getByText('selectDuration');
    expect(headerElement).toBeInTheDocument();
  });
});
