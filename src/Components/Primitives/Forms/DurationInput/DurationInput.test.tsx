import DurationInput from './DurationInput';
import { render } from 'utils/tests';
import { defaultProps } from './fixtures';
import { fireEvent } from '@testing-library/react';
import { DURATION_LIMITS } from 'constants/Duration';

describe('Duration Input', () => {
  // Define methods
  let getByRole;
  let getByLabelText;
  let getAllByLabelText;

  describe('Basic interactions', () => {
    beforeEach(() => {
      let result = render(<DurationInput {...defaultProps} />);

      // Link methods to the DOM
      getByRole = result.getByRole;
      getByLabelText = result.getByLabelText;
      getAllByLabelText = result.getAllByLabelText;
      const inputElement = getByRole('input-modal');
      fireEvent.click(inputElement);
    });

    it('should increase value if user clicks the arrow up', () => {
      const arrowUpButton = getByLabelText('Increase seconds');
      fireEvent.click(arrowUpButton);

      const numericalInput = getByLabelText('Numerical input for seconds');
      expect(numericalInput).toHaveDisplayValue('1');
    });

    it('should decrease value if user clicks the arrow down', () => {
      const arrowUpButton = getByLabelText('Increase seconds');
      fireEvent.click(arrowUpButton);
      fireEvent.click(arrowUpButton);
      fireEvent.click(arrowUpButton);

      const arrowDownButton = getByLabelText('Decrease seconds');
      fireEvent.click(arrowDownButton);

      const numericalInput = getByLabelText('Numerical input for seconds');
      expect(numericalInput).toHaveDisplayValue('2');
    });

    it('input can be set manually', () => {
      const numericalInput = getByLabelText('Numerical input for seconds');
      fireEvent.change(numericalInput, { target: { value: 5 } });

      expect(numericalInput).toHaveDisplayValue('5');
    });

    it('should render a warning if value is higher than permitted', async () => {
      const numericalInput = getByLabelText('Numerical input for seconds');
      fireEvent.change(numericalInput, { target: { value: 61 } });

      const warningMessage = getByLabelText('Warning message for seconds');
      expect(warningMessage).toBeInTheDocument();
    });

    it('arrow down gets disabled if value cannot be decreased', () => {
      const arrowDownButton = getByLabelText('Decrease seconds');
      expect(arrowDownButton).toBeDisabled();
    });

    it('arrow up gets disabled if value cannot be increased', () => {
      const numericalInput = getByLabelText('Numerical input for seconds');
      fireEvent.change(numericalInput, { target: { value: 59 } });
      const arrowUpButton = getByLabelText('Increase seconds');
      expect(arrowUpButton).toBeDisabled();
    });

    it('all values have a numerical input, and increase and decrease buttons', () => {
      const numberOfTimePeriods = Object.keys(DURATION_LIMITS).length;
      const numberOfNumericalInputs = getAllByLabelText('Numerical input', {
        exact: false,
      }).length;
      const numberOfIncreaseButtons = getAllByLabelText('Increase', {
        exact: false,
      }).length;
      const numberOfDecreaseButtons = getAllByLabelText('Decrease', {
        exact: false,
      }).length;

      expect(numberOfTimePeriods).toEqual(numberOfNumericalInputs);
      expect(numberOfIncreaseButtons).toEqual(numberOfNumericalInputs);
      expect(numberOfDecreaseButtons).toEqual(numberOfNumericalInputs);
    });

    it('input value reflects duration picker selection', () => {});
    it('values in seconds are correctly calculated', () => {});
  });
});
